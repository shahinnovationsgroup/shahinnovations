import { useEffect, useRef } from 'react'

import './motion-scenes.css'



const motionMarkup = `

<main>

  <section class="scene s1 in-view" id="scene1">

    <div class="copy">

      <p class="eyebrow">TECHNOLOGY · INNOVATION · DIGITAL SOLUTIONS</p>

      <h1>Building the<br><em>Digital Future</em></h1>

      <p class="lead">ShahInnovations creates modern websites, applications and digital solutions that help businesses turn ideas into powerful digital experiences.</p>

      <div class="buttons">

        <a class="btn primary" href="#scene2">Explore the next scene ↓</a>

        <a class="btn" href="#scene5">View digital services ↗</a>

      </div>

      <p class="label" style="margin-top:22px">MODERN TECHNOLOGY · RESPONSIVE DESIGN · BUSINESS FOCUSED</p>

    </div>

    <div class="visual assembly">

      <div class="platform"></div>

      <div class="automation-console" aria-label="WhatsApp and social media automation flow">

        <div class="automation-console-head"><span class="automation-live"></span> SHAHINNOVATIONS AUTOMATION <b>LIVE</b></div>

        <div class="automation-flow">

          <div class="automation-app wa"><span>◉</span><small>WhatsApp</small></div>

          <i class="flow-link link-one">›</i>

          <div class="automation-ai"><span>AI</span><small>PROCESS</small></div>

          <i class="flow-link link-two">›</i>

          <div class="automation-app social"><span>◎</span><small>Social</small></div>

        </div>

        <div class="automation-typing">

          <span class="typing-label">AUTO REPLY</span>

          <span class="typing-text">Thanks for contacting us<span class="typing-caret">▍</span></span>

          <span class="typing-check">✓ SENT</span>

        </div>

      </div>

      <div class="device d1"><div class="screenbox"><div class="bar"></div><div class="line"></div><div class="line"></div><div class="minirow"><i></i><i></i><i></i></div></div><div class="base"></div></div>

      <div class="device d2"><div class="screenbox"><div class="bar"></div><div class="line"></div><div class="line"></div></div><div class="base"></div></div>

      <div class="device d3"><div class="screenbox"><div class="bar"></div><div class="line"></div><div class="line"></div></div><div class="base"></div></div>

      <div class="device d4"><div class="screenbox"><div class="bar"></div><div class="line"></div><div class="line"></div></div><div class="base"></div></div>

      <div class="float-chip fc1">01 / WEB EXPERIENCE</div>

      <div class="float-chip fc2">02 / DIGITAL SYSTEMS</div>

      <div class="float-chip fc3">03 / CONNECTED FLOW</div>

    </div>

    <div class="scene-caption"><span>SCENE 01 / BUILD</span><span>SCROLL TO CONTINUE ↓</span></div>

  </section>



  <section class="scene s2" id="scene2">

    <div class="particle-field" id="particles"></div>

    <div class="copy">

      <p class="eyebrow">WHY SHAHINNOVATIONS</p>

      <h2>Technology with<br><em>Purpose.</em></h2>

      <p class="lead">We believe technology should be simple, useful and powerful. Our goal is to transform ideas into digital experiences that deliver real value.</p>

      <div class="buttons"><a class="btn primary" href="#scene3">Move through the layers ↓</a></div>

      <p class="label" style="margin-top:20px">PARTICLES · ORBITS · CONNECTED TOUCHPOINTS</p>

    </div>

    <div class="visual">

      <div class="ai-sphere"><strong>AI</strong><small>CONNECTED INTELLIGENCE</small></div>

      <div class="orbit-node" style="--x:8%;--y:26%"><b>WEB</b>Website visitor</div>

      <div class="orbit-node" style="--x:80%;--y:21%;--delay:-1s"><b>AI LOGIC</b>Smart processing</div>

      <div class="orbit-node" style="--x:10%;--y:75%;--delay:-2s"><b>MESSAGE</b>Customer enquiry</div>

      <div class="orbit-node" style="--x:83%;--y:76%;--delay:-.5s"><b>RESPONSE</b>Next best action</div>

      <div class="orbit-node" style="--x:51%;--y:5%;--delay:-1.7s"><b>DATA</b>Useful context</div>

    </div>

    <div class="scene-caption"><span>SCENE 02 / AI PARTICLES</span><span>NEW BACKGROUND · NEW MOTION</span></div>

  </section>



  <section class="scene s3" id="scene3">

    <div class="copy">

      <p class="eyebrow">OUR APPROACH</p>

      <h2>From raw data<br>to <em>smart action.</em></h2>

      <p class="lead">Watch an incoming request move through an AI core: understand the intent, process the information, then deliver a useful response.</p>

      <div class="buttons"><a class="btn primary" href="#scene4">Explore the next layer ↓</a></div>

      <p class="label" style="margin-top:20px">INPUT · REASON · GENERATE · RESPOND</p>

    </div>

    <div class="ai-processing" aria-label="Animated AI processing diagram">

      <div class="ai-grid"></div>

      <div class="ai-top-label"><span class="live-dot"></span> AI ENGINE <b>ONLINE</b></div>

      <div class="ai-stream stream-a"></div><div class="ai-stream stream-b"></div><div class="ai-stream stream-c"></div>

      <div class="ai-orbit orbit-outer"></div><div class="ai-orbit orbit-mid"></div><div class="ai-orbit orbit-inner"></div>

      <div class="ai-core"><div class="ai-core-glow"></div><div class="ai-core-mark">AI</div><div class="ai-core-caption">PROCESSING</div></div>

      <div class="ai-node ai-input"><span class="node-icon">↘</span><b>INPUT</b><small>Customer request</small><i class="node-status">RECEIVED</i></div>

      <div class="ai-node ai-intent"><span class="node-icon">⌕</span><b>UNDERSTAND</b><small>Intent detection</small><i class="node-status">ANALYSING</i></div>

      <div class="ai-node ai-generate"><span class="node-icon">✳</span><b>GENERATE</b><small>Response logic</small><i class="node-status">BUILDING</i></div>

      <div class="ai-node ai-output"><span class="node-icon">↗</span><b>OUTPUT</b><small>Smart response</small><i class="node-status">READY</i></div>

      <div class="ai-data-packet packet-a"></div><div class="ai-data-packet packet-b"></div><div class="ai-data-packet packet-c"></div>

      <div class="ai-terminal"><span>PROCESS LOG</span><p><i></i> Parsing request...</p><p><i></i> Context matched</p><p><i></i> Response generated</p></div>

      <div class="ai-bottom-label">NEURAL FLOW <span>● LIVE</span></div>

    </div>

    <div class="scene-caption"><span>SCENE 03 / AI PROCESSING</span><span>REQUEST → INTELLIGENCE → RESPONSE</span></div>

  </section>



  <section class="scene s4" id="scene4">

    <div class="split-visual brand-search-visual" aria-label="ShahInnovations search scanning animation">

      <div class="search-grid"></div>

      <div class="search-ring ring-one"></div>

      <div class="search-ring ring-two"></div>

      <div class="scan"></div>

      <div class="search-cross cross-one"></div>

      <div class="search-cross cross-two"></div>

      <div class="brand-search-label"><span class="search-live-dot"></span> BRAND SIGNAL SCAN <b>LIVE</b></div>

      <div class="brand-target target-one active"><span class="target-corner"></span><strong>Shah<span>Innovations</span></strong><small>TECHNOLOGY · INNOVATION</small></div>

      <div class="brand-target target-two"><span class="target-corner"></span><strong>Shah<span>Innovations</span></strong><small>TECHNOLOGY · INNOVATION</small></div>

      <div class="brand-target target-three"><span class="target-corner"></span><strong>Shah<span>Innovations</span></strong><small>TECHNOLOGY · INNOVATION</small></div>

      <div class="brand-target target-four"><span class="target-corner"></span><strong>Shah<span>Innovations</span></strong><small>TECHNOLOGY · INNOVATION</small></div>

      <div class="brand-search-status"><i></i><span>SCANNING DIGITAL SPACE</span><b id="brandScanStep">01 / 04</b></div>

    </div>

    <div class="copy split-copy">

      <p class="eyebrow">WHY SHAHINNOVATIONS</p>

      <h2>Smart digital<br><em>experiences.</em></h2>

      <p>Modern, responsive experiences. Clean and scalable development. Business-focused solutions and continuous innovation.</p>

      <div class="buttons"><a class="btn primary" href="#scene5">Discover the services ↓</a></div>

      <p class="label" style="margin-top:20px">SCANNING · BRAND SIGNAL · SCROLL-RESPONSIVE MOTION</p>

    </div>

    <div class="scene-caption"><span>SCENE 04 / BRAND SIGNAL</span><span>SCROLL TO TRACK SHAHINNOVATIONS</span></div>

  </section>



  <section class="scene s5" id="scene5">

    <div class="copy">

      <p class="eyebrow">WHAT WE DO</p>

      <h2>Our Core<br><em>Services.</em></h2>

      <p class="lead">Technology solutions designed to help businesses build, improve and grow their digital presence.</p>

      <p class="label" style="margin-top:20px">BUILD · AUTOMATE · ORCHESTRATE · INTEGRATE</p>

    </div>

    <div class="glass-grid">

      <article class="glass-card website-card" style="--rot:-5deg;--delay:-.3s">

        <div class="motion-visual website-build" aria-hidden="true">

          <div class="build-browser">

            <div class="browser-top"><i></i><i></i><i></i><b>yourwebsite.com</b></div>

            <div class="build-layout">

              <div class="build-side"></div>

              <div class="build-content"><span class="build-title"></span><span class="build-line"></span><span class="build-line short"></span><div class="build-tiles"><i></i><i></i><i></i></div><span class="build-button"></span></div>

            </div>

          </div>

          <span class="build-cursor"></span><span class="build-tag">LIVE PREVIEW</span>

        </div>

        <div class="glyph">⌘</div><h3>Web Development</h3><p>Watch a responsive page take shape, section by section.</p>

      </article>

      <article class="glass-card automation-card" style="--rot:6deg;--delay:-1.4s">

        <div class="motion-visual automation-gen" aria-hidden="true">

          <div class="auto-core">AI</div><span class="auto-orbit orbit-one"></span><span class="auto-orbit orbit-two"></span>

          <i class="auto-node n1">IN</i><i class="auto-node n2">AI</i><i class="auto-node n3">IF</i><i class="auto-node n4">DO</i><i class="auto-pulse"></i>

          <div class="auto-caption">GENERATING FLOW <b>•••</b></div>

        </div>

        <div class="glyph">✳</div><h3>App Development</h3><p>Triggers, decisions and actions assemble into an automated flow.</p>

      </article>

      <article class="glass-card workflow-card" style="--rot:5deg;--delay:-2s">

        <div class="motion-visual workflow-map" aria-hidden="true">

          <svg viewBox="0 0 280 110" preserveAspectRatio="none">

            <path class="wf-line wf-a" d="M25 55 H82 Q92 55 92 36 V24 H142"/>

            <path class="wf-line wf-b" d="M82 55 Q92 55 92 78 V88 H142"/>

            <path class="wf-line wf-c" d="M176 24 H218 Q228 24 228 40 V55"/>

            <path class="wf-line wf-d" d="M176 88 H218 Q228 88 228 70 V55 H258"/>

          </svg>

          <div class="wf-node wf-start">LEAD</div><div class="wf-node wf-task">CHECK</div><div class="wf-node wf-task second">ASSIGN</div><div class="wf-node wf-end">DONE</div>

          <span class="wf-dot"></span><div class="wf-caption">BUSINESS PROCESS MAP</div>

        </div>

        <div class="glyph">↔</div><h3>Digital Solutions</h3><p>Requests branch through steps, approvals and assigned actions.</p>

      </article>

      <article class="glass-card integration-card" style="--rot:-4deg;--delay:-.8s">

        <div class="motion-visual integration-web" aria-hidden="true">

          <div class="int-ring ring-a"></div><div class="int-ring ring-b"></div><div class="int-center">SI</div>

          <div class="int-node int-web">WEB</div><div class="int-node int-data">DATA</div><div class="int-node int-msg">MSG</div><div class="int-node int-cloud">CLOUD</div>

          <span class="int-beam beam-a"></span><span class="int-beam beam-b"></span>

          <div class="int-caption">CONNECTED SYSTEMS <b>● ONLINE</b></div>

        </div>

        <div class="glyph">◉</div><h3>Business-Focused Solutions</h3><p>Websites, data, messaging and cloud tools connect in one ecosystem.</p>

      </article>

    </div>

    <div class="scene-caption"><span>SCENE 05 / SERVICES IN MOTION</span><span>WATCH EACH SYSTEM BUILD</span></div>

  </section>



  <section class="scene s6" id="scene6">

    <div class="copy">

      <p class="eyebrow">LET’S WORK TOGETHER</p>

      <h2>Have an Idea?<br><em>Let’s work together.</em></h2>

      <p class="lead">Let’s turn your idea into a modern digital experience with ShahInnovations. Contact us to discuss your project.</p>

      <div class="closing">ShahInnovations — Technology · Innovation · Digital Solutions</div>

      <div class="buttons"><a class="btn primary" href="#scene1">↻ Replay all six scenes</a></div>

    </div>

    <div class="workflow">

      <svg class="flow-svg" viewBox="0 0 600 500" preserveAspectRatio="none">

        <defs><linearGradient id="flowGrad"><stop stop-color="#42e8ff"/><stop offset="1" stop-color="#a178ff"/></linearGradient></defs>

        <path class="connection connection-website" d="M300 250 Q190 115 90 90"/><path class="connection connection-reply" d="M300 250 Q430 110 510 95"/><path class="connection connection-marketing" d="M300 250 Q170 330 85 390"/><path class="connection connection-app" d="M300 250 Q430 340 510 390"/><path class="connection connection-voice" d="M300 250 Q300 125 300 55"/><path class="connection connection-agentic" d="M300 250 Q300 375 300 450"/>

      </svg>

      <div class="flow-core" aria-label="ShahInnovations Upcoming Projects">
        <span class="typing-brand">ShahInnovations Upcoming Projects</span><span class="typing-caret" aria-hidden="true">▍</span>
      </div>

      <div class="flow-node service-website" style="--x:15%;--y:18%;--delay:-.3s">
        <span class="service-icon website-icon" aria-hidden="true">⌘</span><b>Website Building</b><small class="service-live">BUILDING</small>
      </div>

      <div class="flow-node service-reply" style="--x:85%;--y:18%;--delay:-1s">
        <span class="service-icon reply-icon" aria-hidden="true">↩</span><b>Instant WhatsApp Reply</b><small class="service-live">INSTANT REPLY</small>
      </div>

      <div class="flow-node service-marketing" style="--x:14%;--y:78%;--delay:-2s">
        <span class="service-icon marketing-icon" aria-hidden="true">◉</span><b>WhatsApp Marketing</b><small class="service-live">CAMPAIGN LIVE</small>
      </div>

      <div class="flow-node service-app" style="--x:85%;--y:78%;--delay:-.7s">
        <span class="service-icon app-icon" aria-hidden="true">▣</span><b>App Building</b><small class="service-live">DEPLOYING</small>
      </div>

      <div class="flow-node service-voice" style="--x:50%;--y:9%;--delay:-1.6s">
        <span class="service-icon voice-icon" aria-hidden="true">≋</span><b>Voice Automation</b><small class="service-live">LISTENING</small>
      </div>

      <div class="flow-node service-agentic" style="--x:50%;--y:91%;--delay:-.4s">
        <span class="service-icon agentic-icon" aria-hidden="true">✳</span><b>Agentic AI</b><small class="service-live">AGENT ACTIVE</small>
      </div>

    </div>

    <div class="scene-caption"><span>SCENE 06 / CONNECTED WORKFLOW</span><span>END OF MOTION PREVIEW · REPLAY ↗</span></div>

  </section>

</main>

`



export default function MotionExperience() {

  const rootRef = useRef(null)



  useEffect(() => {

    const root = rootRef.current

    if (!root) return



    const scenes = [...root.querySelectorAll('.scene')]

    const nav = [...root.querySelectorAll('.side-index a')]

    const bar = root.querySelector('#progressBar')

    const cleanups = []



    // Hide the side navigation when the footer enters the viewport.*

    const sideIndex = root.querySelector('.side-index')

    const pageFooter = document.querySelector('footer')



    const updateSideIndexVisibility = () => {

      if (!sideIndex || scenes.length === 0) return



      const lastScene = scenes[scenes.length - 1]

      const lastSceneRect = lastScene.getBoundingClientRect()

      const footerRect = pageFooter ? pageFooter.getBoundingClientRect() : null



      const footerVisible = Boolean(

        footerRect && footerRect.top < window.innerHeight

      )

      const finalSceneEnded = lastSceneRect.bottom <= 0



      const shouldHide = footerVisible || finalSceneEnded



      sideIndex.style.opacity = shouldHide ? '0' : '1'

      sideIndex.style.visibility = shouldHide ? 'hidden' : 'visible'

      sideIndex.style.pointerEvents = shouldHide ? 'none' : 'auto'

    }



    window.addEventListener('scroll', updateSideIndexVisibility, {

      passive: true

    })

    window.addEventListener('resize', updateSideIndexVisibility)

    updateSideIndexVisibility()



    cleanups.push(() => {

      window.removeEventListener('scroll', updateSideIndexVisibility)

      window.removeEventListener('resize', updateSideIndexVisibility)

    })



    // Create the scroll hint.*

    const scrollHint = document.createElement('div')

    scrollHint.className = 'si-scroll-hint'

    scrollHint.setAttribute('aria-live', 'polite')

    scrollHint.setAttribute('aria-label', 'Scroll to continue')



    Object.assign(scrollHint.style, {

      position: 'fixed',

      left: '50%',

      bottom: '24px',

      transform: 'translateX(-50%) translateY(8px)',

      zIndex: '100',

      display: 'flex',

      alignItems: 'center',

      justifyContent: 'center',

      gap: '8px',

      minWidth: '160px',

      padding: '8px 12px',

      border: '1px solid rgba(255,255,255,.20)',

      borderRadius: '999px',

      background: 'rgba(8,12,22,.72)',

      backdropFilter: 'blur(12px)',

      WebkitBackdropFilter: 'blur(12px)',

      color: '#fff',

      fontSize: '12px',

      fontWeight: '600',

      lineHeight: '1',

      opacity: '0',

      visibility: 'hidden',

      pointerEvents: 'none',

      transition: 'opacity .25s ease, transform .25s ease, visibility .25s ease',

      whiteSpace: 'nowrap'

    })



    const scrollMouse = document.createElement('span')

    Object.assign(scrollMouse.style, {

      display: 'none',

      width: '17px',

      height: '28px',

      flexShrink: '0',

      alignItems: 'flex-start',

      justifyContent: 'center',

      border: '2px solid rgba(255,255,255,.82)',

      borderRadius: '999px',

      boxSizing: 'border-box'

    })



    const scrollDot = document.createElement('span')

    Object.assign(scrollDot.style, {

      display: 'block',

      width: '4px',

      height: '6px',

      marginTop: '5px',

      borderRadius: '999px',

      background: '#42e8ff',

      animation: 'siScrollDot 1s ease-in-out infinite'

    })



    scrollMouse.appendChild(scrollDot)



    const scrollText = document.createElement('span')

    scrollText.textContent = 'Scroll'



    const scrollArrow = document.createElementNS(

      'http\://www.w3.org/2000/svg',

      'svg'

    )



    scrollArrow.setAttribute('viewBox', '0 0 24 24')

    scrollArrow.setAttribute('width', '14')

    scrollArrow.setAttribute('height', '14')

    scrollArrow.setAttribute('aria-hidden', 'true')

    scrollArrow.innerHTML =

      '<path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'



    scrollHint.append(scrollText, scrollArrow, scrollMouse)

    root.appendChild(scrollHint)



    const scrollStyle = document.createElement('style')

    scrollStyle.textContent = `

      @keyframes siScrollDot {

        0%, 100% {

          transform: translateY(0);

          opacity: 1;

        }

        50% {

          transform: translateY(6px);

          opacity: .45;

        }

      }



      @media (prefers-reduced-motion: reduce) {

        .si-scroll-hint,

        .si-scroll-hint * {

          animation: none !important;

          transition: none !important;

        }

      }

    `

    document.head.appendChild(scrollStyle)



    let hintTimer = null

    let settleTimer = null

    let activeSceneIndex = -1

    let hintStage = 0



    const hideScrollHint = () => {

      scrollHint.style.opacity = '0'

      scrollHint.style.visibility = 'hidden'

      scrollHint.style.transform = 'translateX(-50%) translateY(8px)'

    }



    const clearHintTimers = () => {

      window.clearTimeout(hintTimer)

      window.clearTimeout(settleTimer)

    }



    const findActiveScene = () => {

      const viewportCenter = window.innerHeight / 2

      let closestIndex = 0

      let closestDistance = Infinity



      scenes.forEach((scene, index) => {

        const rect = scene.getBoundingClientRect()

        const sceneCenter = rect.top + rect.height / 2

        const distance = Math.abs(sceneCenter - viewportCenter)



        if (distance < closestDistance) {

          closestDistance = distance

          closestIndex = index

        }

      })



      return closestIndex

    }



    const showScrollHint = (stage) => {

      // Show hints on Scenes 01–06, but hide them when the footer appears.*

      const footerRect = pageFooter ? pageFooter.getBoundingClientRect() : null



      if (footerRect && footerRect.top < window.innerHeight) {

        hideScrollHint()

        hintStage = 0

        return

      }



      hintStage = stage



      if (stage === 1) {

        scrollText.textContent = 'Scroll'

        scrollArrow.style.display = 'block'

        scrollMouse.style.display = 'none'

        scrollHint.style.minWidth = 'auto'

      } else {

        scrollText.textContent = 'Keep scrolling'

        scrollArrow.style.display = 'none'

        scrollMouse.style.display = 'flex'

        scrollHint.style.minWidth = '160px'

      }



      scrollHint.style.opacity = '1'

      scrollHint.style.visibility = 'visible'

      scrollHint.style.transform = 'translateX(-50%) translateY(0)'

    }



    const startSceneHintTimer = () => {

      clearHintTimers()

      hideScrollHint()

      hintStage = 0



      // The hint can appear on all six scenes.*

      hintTimer = window.setTimeout(() => {

        if (findActiveScene() !== activeSceneIndex) {

          updateSceneHint()

          return

        }



        showScrollHint(1)



        // Show "Keep scrolling" two seconds later.*

        hintTimer = window.setTimeout(() => {

          if (findActiveScene() !== activeSceneIndex) {

            updateSceneHint()

            return

          }



          showScrollHint(2)

        }, 2000)

      }, 3000)

    }



    const updateSceneHint = () => {

      const nextIndex = findActiveScene()

      const lastScene = scenes[scenes.length - 1]

      const lastSceneRect = lastScene

        ? lastScene.getBoundingClientRect()

        : null

      const footerRect = pageFooter ? pageFooter.getBoundingClientRect() : null

      const footerVisible = Boolean(

        footerRect && footerRect.top < window.innerHeight

      )



      // Stop the hint once Scene 06 has passed or the footer is visible.*

      const experienceEnded =

        !lastSceneRect || lastSceneRect.bottom <= 0 || footerVisible



      if (experienceEnded) {

        clearHintTimers()

        hideScrollHint()

        hintStage = 0

        activeSceneIndex = nextIndex

        return

      }



      if (nextIndex !== activeSceneIndex) {

        activeSceneIndex = nextIndex

        startSceneHintTimer()

      } else if (hintStage === 0) {

        startSceneHintTimer()

      }

    }



    const onHintScroll = () => {

      clearHintTimers()

      hideScrollHint()

      hintStage = 0



      settleTimer = window.setTimeout(() => {

        updateSceneHint()

      }, 180)

    }



    window.addEventListener('scroll', onHintScroll, { passive: true })

    window.addEventListener('resize', onHintScroll)



    activeSceneIndex = findActiveScene()

    updateSceneHint()



    cleanups.push(() => {

      clearHintTimers()

      window.clearTimeout(settleTimer)

      window.removeEventListener('scroll', onHintScroll)

      window.removeEventListener('resize', onHintScroll)

      scrollHint.remove()

      scrollStyle.remove()

    })



    // Progress bar.*

    const updateProgress = () => {

      const max = document.documentElement.scrollHeight - window.innerHeight



      if (bar) {

        bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%'

      }

    }



    window.addEventListener('scroll', updateProgress, { passive: true })

    window.addEventListener('resize', updateProgress)



    cleanups.push(() => {

      window.removeEventListener('scroll', updateProgress)

      window.removeEventListener('resize', updateProgress)

    })



    // Animate scenes as they enter the viewport and update the active number.*

    let observer



    if ('IntersectionObserver' in window) {

      observer = new IntersectionObserver(

        entries => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add('in-view')



              const index = scenes.indexOf(entry.target)



              nav.forEach((link, i) => {

                link.classList.toggle('active', i === index)

              })

            }

          })

        },

        { threshold: 0.32 }

      )



      scenes.forEach(scene => observer.observe(scene))

      cleanups.push(() => observer.disconnect())

    }



    // Scene 04: animate the four ShahInnovations scan positions.*

    const brandVisual = root.querySelector('.brand-search-visual')

    const brandScene = root.querySelector('#scene4')



    if (brandVisual && brandScene) {

      const targets = [...brandVisual.querySelectorAll('.brand-target')]

      const stepLabel = brandVisual.querySelector('#brandScanStep')



      const updateBrandTarget = () => {

        if (!targets.length) return



        const rect = brandScene.getBoundingClientRect()

        const viewportHeight = window.innerHeight



        const progress = Math.max(

          0,

          Math.min(

            0.999,

            (viewportHeight - rect.top) / (viewportHeight + rect.height)

          )

        )



        const activeIndex = Math.min(

          targets.length - 1,

          Math.floor(progress * targets.length)

        )



        targets.forEach((target, index) => {

          target.classList.toggle('active', index === activeIndex)

        })



        if (stepLabel) {

          stepLabel.textContent =

            `${String(activeIndex + 1).padStart(2, '0')} / ${String(targets.length).padStart(2, '0')}`

        }

      }



      window.addEventListener('scroll', updateBrandTarget, { passive: true })

      window.addEventListener('resize', updateBrandTarget)



      cleanups.push(() => {

        window.removeEventListener('scroll', updateBrandTarget)

        window.removeEventListener('resize', updateBrandTarget)

      })



      updateBrandTarget()

    }



    // Generate background particles for Scene 02.*

    const particleBox = root.querySelector('#particles')



    if (particleBox && !particleBox.childElementCount) {

      const fragment = document.createDocumentFragment()



      for (let i = 0; i < 100; i++) {

        const particle = document.createElement('i')



        particle.style.setProperty('--x', Math.random() * 100 + '%')

        particle.style.setProperty('--y', Math.random() * 100 + '%')

        particle.style.setProperty('--dx', (Math.random() * 120 - 60) + 'px')

        particle.style.setProperty('--dy', (Math.random() * 120 - 60) + 'px')

        particle.style.setProperty('--d', (3 + Math.random() * 6) + 's')

        particle.style.animationDelay = (-Math.random() * 8) + 's'



        fragment.appendChild(particle)

      }



      particleBox.appendChild(fragment)

    }



    // Desktop pointer movement for the Scene 01 hero visual.*

    const hero = root.querySelector('#scene1 .assembly')

    const heroSection = root.querySelector('#scene1')

    const pointerFine = window.matchMedia('(pointer:fine)').matches



    const onPointerMove = event => {

      if (!hero || !heroSection) return



      const rect = heroSection.getBoundingClientRect()

      const x = (event.clientX - rect.left) / rect.width - 0.5

      const y = (event.clientY - rect.top) / rect.height - 0.5



      hero.style.transform = `rotateY(${x * 5}deg) rotateX(${-y * 3}deg)`

    }



    const onPointerLeave = () => {

      if (hero) {

        hero.style.transform = 'rotateY(0deg) rotateX(0deg)'

      }

    }



    if (pointerFine && heroSection) {

      heroSection.addEventListener('pointermove', onPointerMove)

      heroSection.addEventListener('pointerleave', onPointerLeave)



      cleanups.push(() => {

        heroSection.removeEventListener('pointermove', onPointerMove)

        heroSection.removeEventListener('pointerleave', onPointerLeave)

      })

    }



    updateProgress()



    return () => {

      cleanups.forEach(cleanup => cleanup())

    }

  }, [])



  return (

    <div className="si-motion-experience" ref={rootRef}>

      <div className="progress">

        <span id="progressBar" />

      </div>



      <aside className="side-index" aria-label="Motion scenes">

        {[1, 2, 3, 4, 5, 6].map(number => (

          <a

            key={number}

            className={number === 1 ? 'active' : ''}

            href={`#scene${number}`}

            aria-label={`Go to scene ${number}`}

          >

            {String(number).padStart(2, '0')}

          </a>

        ))}

      </aside>



      <div dangerouslySetInnerHTML={{ __html: motionMarkup }} />

    </div>

  )

}