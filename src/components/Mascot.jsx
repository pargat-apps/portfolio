import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronUp, ChevronDown } from "lucide-react"

// A small robot companion (custom-rendered asset pack, not a third-party
// character) that reacts to scroll direction, idles/sleeps when the visitor
// isn't interacting, and reacts to real site events — GitHub data loading
// or failing, a resume download, reaching the bottom of the page, and being
// hovered/clicked directly.

const ASSET = "/mascot"

const BODY_SRC = {
  idle: `${ASSET}/idle.webp`,
  "scroll-down": `${ASSET}/scroll-down.webp`,
  "scroll-up": `${ASSET}/scroll-up.webp`,
  wave: `${ASSET}/wave.webp`,
  sleep: `${ASSET}/sleep-inactive.gif`,
}

const CARD_CONTENT = {
  click: { src: `${ASSET}/click-reaction.gif` },
  hover: { src: `${ASSET}/hover-curiosity.gif` },
  success: { src: `${ASSET}/success-celebrate.gif` },
  error: { src: `${ASSET}/error-confused.gif`, text: "Hmm, GitHub hiccupped — stats may be stale." },
  loading: { src: `${ASSET}/loading-scan.gif`, text: "Fetching my GitHub stats…" },
}

const GREETINGS = [
  "Thanks for scrolling! 👋",
  "Let's build something great!",
  "Enjoying the site?",
  "Full-stack & full speed!",
  "Keep going, more below!",
]

const INACTIVITY_SLEEP_MS = 40000
const WAVE_CHANCE_AFTER_MS = 7000

const Mascot = () => {
  const [body, setBody] = useState("idle")
  const [card, setCard] = useState(null)
  const [cardMessage, setCardMessage] = useState(null)
  const [topPx, setTopPx] = useState(120)
  const [reduceMotion, setReduceMotion] = useState(false)

  const lastScrollY = useRef(0)
  const lastActivity = useRef(Date.now())
  const bodyRef = useRef(body)
  const cardRef = useRef(card)
  const scrollStopTimer = useRef(null)
  const cardToken = useRef(0)

  useEffect(() => {
    bodyRef.current = body
  }, [body])

  useEffect(() => {
    cardRef.current = card
  }, [card])

  // Respect reduced-motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduceMotion(mq.matches)
    const handler = (e) => setReduceMotion(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  // Preload the poses that are almost certainly needed soon so the first
  // scroll/idle transition doesn't pop in empty.
  useEffect(() => {
    if (reduceMotion) return
    const t = setTimeout(() => {
      ;[BODY_SRC.idle, BODY_SRC["scroll-down"], BODY_SRC["scroll-up"], BODY_SRC.wave].forEach((src) => {
        const img = new Image()
        img.src = src
      })
    }, 1200)
    return () => clearTimeout(t)
  }, [reduceMotion])

  const showCard = (type, text, duration) => {
    const token = ++cardToken.current
    setCard(type)
    setCardMessage(text ?? null)
    if (duration) {
      setTimeout(() => {
        if (cardToken.current === token) {
          setCard(null)
          setCardMessage(null)
        }
      }, duration)
    }
  }

  const hideCardIfType = (type) => {
    if (cardRef.current !== type) return
    setCard(null)
    setCardMessage(null)
  }

  // Scroll tracking: vertical position along the page + direction-based body
  useEffect(() => {
    if (reduceMotion) return

    const updatePosition = () => {
      const doc = document.documentElement
      const scrollY = window.scrollY
      const maxScroll = Math.max(doc.scrollHeight - window.innerHeight, 1)
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1)

      // The character is bottom-anchored to this top value and extends
      // upward (~80px), so the minimum must clear the fixed navbar's real
      // height, not just an arbitrary constant.
      const navHeight = document.querySelector("nav")?.getBoundingClientRect().height ?? 72
      const minTop = navHeight + 96
      const usableHeight = Math.max(window.innerHeight - minTop - 200, 100)
      setTopPx(minTop + progress * usableHeight)

      const delta = scrollY - lastScrollY.current
      lastScrollY.current = scrollY
      lastActivity.current = Date.now()

      if (Math.abs(delta) > 2) {
        setBody(delta > 0 ? "scroll-down" : "scroll-up")

        if (progress >= 0.985) {
          showCard("success", "You've reached the end — let's talk! 👋", 2600)
        }
      }

      clearTimeout(scrollStopTimer.current)
      scrollStopTimer.current = setTimeout(() => {
        setBody((b) => (b === "scroll-down" || b === "scroll-up" ? "idle" : b))
      }, 450)
    }

    updatePosition()
    window.addEventListener("scroll", updatePosition, { passive: true })
    window.addEventListener("resize", updatePosition)
    return () => {
      window.removeEventListener("scroll", updatePosition)
      window.removeEventListener("resize", updatePosition)
      clearTimeout(scrollStopTimer.current)
    }
  }, [reduceMotion])

  // Activity tracking + idle heartbeat: occasional waves, and sleep after a
  // long stretch of no interaction at all.
  useEffect(() => {
    if (reduceMotion) return

    const markActivity = () => {
      lastActivity.current = Date.now()
      if (bodyRef.current === "sleep") setBody("idle")
    }

    window.addEventListener("mousemove", markActivity, { passive: true })
    window.addEventListener("touchstart", markActivity, { passive: true })
    window.addEventListener("keydown", markActivity)

    const heartbeat = setInterval(() => {
      if (document.visibilityState !== "visible") return
      const idleFor = Date.now() - lastActivity.current
      const currentBody = bodyRef.current
      const isScrolling = currentBody === "scroll-down" || currentBody === "scroll-up"

      if (idleFor > INACTIVITY_SLEEP_MS) {
        if (currentBody !== "sleep") setBody("sleep")
      } else if (!isScrolling && currentBody !== "sleep" && idleFor > WAVE_CHANCE_AFTER_MS && Math.random() < 0.4) {
        setBody("wave")
        setTimeout(() => setBody((b) => (b === "wave" ? "idle" : b)), 2200)
      }
    }, 5000)

    return () => {
      clearInterval(heartbeat)
      window.removeEventListener("mousemove", markActivity)
      window.removeEventListener("touchstart", markActivity)
      window.removeEventListener("keydown", markActivity)
    }
  }, [reduceMotion])

  // React GitHub data loading / error (dispatched from useGitHub.js — no
  // duplicate fetch, just listening in on the real request lifecycle)
  useEffect(() => {
    const onLoading = () => showCard("loading", CARD_CONTENT.loading.text, null)
    const onLoaded = () => hideCardIfType("loading")
    const onError = () => showCard("error", CARD_CONTENT.error.text, 3200)

    window.addEventListener("github:loading", onLoading)
    window.addEventListener("github:loaded", onLoaded)
    window.addEventListener("github:error", onError)
    return () => {
      window.removeEventListener("github:loading", onLoading)
      window.removeEventListener("github:loaded", onLoaded)
      window.removeEventListener("github:error", onError)
    }
  }, [])

  // Celebrate a resume download from anywhere on the site
  useEffect(() => {
    const onClick = (e) => {
      if (e.target.closest("a[download]")) {
        lastActivity.current = Date.now()
        showCard("success", "Thanks for grabbing my résumé! 📄", 2600)
      }
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])

  const handleMascotClick = () => {
    lastActivity.current = Date.now()
    setBody("wave")
    setTimeout(() => setBody((b) => (b === "wave" ? "idle" : b)), 1800)
    showCard("click", GREETINGS[Math.floor(Math.random() * GREETINGS.length)], 1800)
  }

  const handleMascotEnter = () => {
    lastActivity.current = Date.now()
    if (!card) showCard("hover", null, null)
  }

  const handleMascotLeave = () => hideCardIfType("hover")

  if (reduceMotion) return null

  const isRunning = body === "scroll-down" || body === "scroll-up"
  const activeCard = card ? CARD_CONTENT[card] : null

  return (
    <div
      className="fixed right-1 sm:right-5 top-0 w-16 h-0 z-[60] pointer-events-none select-none"
      aria-hidden="true"
    >
      <motion.div
        className="absolute right-0"
        animate={{ top: topPx }}
        transition={{ type: "spring", stiffness: 90, damping: 16 }}
        style={{ width: 0 }}
      >
        {/* Reaction card */}
        <AnimatePresence>
          {activeCard && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, x: 10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.85, x: 10 }}
              className="absolute top-1/2 -translate-y-1/2 right-16 sm:right-20 w-28 sm:w-32 pointer-events-none"
            >
              <div className="glass-card rounded-2xl p-2 shadow-xl overflow-hidden">
                <img
                  src={activeCard.src}
                  alt=""
                  className="w-full h-20 sm:h-24 object-contain rounded-lg bg-white"
                />
                {cardMessage && (
                  <p className="text-[10px] sm:text-xs text-center font-medium text-accent-foreground mt-1.5 leading-snug">
                    {cardMessage}
                  </p>
                )}
              </div>
              <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 glass-card rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Direction hint while actively scrolling */}
        <AnimatePresence>
          {isRunning && (
            <motion.div
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 0.8, x: 0 }}
              exit={{ opacity: 0, x: 6 }}
              className="absolute bottom-6 -left-3 text-primary pointer-events-none"
            >
              {body === "scroll-down" ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Character */}
        <motion.div
          className="absolute right-0 bottom-0 w-14 h-16 sm:w-16 sm:h-20 pointer-events-auto cursor-pointer"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleMascotClick}
          onMouseEnter={handleMascotEnter}
          onMouseLeave={handleMascotLeave}
        >
          <AnimatePresence>
            <motion.img
              key={body}
              src={BODY_SRC[body]}
              alt="Site mascot"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 w-full h-full object-contain drop-shadow-lg"
              draggable={false}
            />
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Mascot
