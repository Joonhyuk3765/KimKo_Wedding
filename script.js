/* ==========================================================================
   Wedding Invitation – Interactions
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------
     0. LANGUAGE (한/영 전환)

     🌐 사용법:
        - 화면 우측 상단 KOR / ENG 버튼으로 전환합니다.
        - URL에 ?lang=en 을 붙이면 영어로 바로 열립니다.
          (외국인 하객에게는 https://kim-ko-wedding.site/?lang=en 공유)
        - 선택한 언어는 localStorage에 저장되어 재방문 시 유지됩니다.
        - 저장된 값이 없으면 브라우저 언어를 감지해 한국어 외 → 영어로 시작.
          (항상 한국어로 시작하고 싶으면 detectLang의 마지막 return을
           'ko'로 바꾸면 됩니다)

     ✏️ 문구 수정:
        - HTML에 보이는 텍스트는 아래 I18N 객체에서 (ko / en 쌍으로),
        - JS가 만들어내는 문구(D-day, 토스트 등)는 STR 객체에서 고치세요.
     ------------------------------------------------------------------ */
  var I18N = {
    /* ---- 표지 ---- */
    name_groom: { ko: '준혁', en: 'Joonhyuk' },
    name_bride: { ko: '미진', en: 'Mijin' },
    cover_marry: { ko: '결혼합니다', en: 'We are getting married' },
    ki_date_label: { ko: '날짜', en: 'Date' },
    ki_date_value: { ko: '2026년 10월 25일 일요일', en: 'Sunday, 25 October 2026' },
    ki_date_sub: { ko: '오후 12시 30분', en: '12:30 PM' },
    ki_venue_label: { ko: '장소', en: 'Venue' },
    ki_venue_value: { ko: '노블발렌티 대치', en: 'Noble Valenti Daechi' },
    ki_venue_sub: {
      ko: '서울 강남구 영동대로 325, S-TOWER',
      en: 'S-Tower, 325 Yeongdong-daero, Gangnam-gu, Seoul'
    },

    /* ---- 인사말 ---- */
    sec_invite: { ko: '초대합니다', en: 'You Are Invited' },
    greet_1: {
      ko: '낙엽이 기분 좋게 길을 덮어주는 가을날<br/>서로에게 단단한 나무와 예쁜 꽃이 되어줄 저희가<br/>다정하게 발맞춰 새로운 길을 나서려 합니다.',
      en: 'On a gentle autumn day, as fallen leaves softly carpet the road,<br/>we — hoping to be a steadfast tree and a lovely blossom for one another —<br/>are setting out together, side by side, on a new path.'
    },
    greet_2: {
      ko: '저희가 그려갈 맑고 따스한 날들에<br/>기쁜 마음으로 함께해 주시면 감사하겠습니다.',
      en: 'It would be our great joy to have you with us<br/>on the bright and warm-hearted days we are about to begin.'
    },
    fam_groom: {
      ko: '<span class="family__parents">김삼채 · 문미경</span>의 장남 <span class="family__name">준혁</span>',
      en: '<span class="family__name">Joonhyuk</span>, son of <span class="family__parents">Kim Sam-chae &amp; Moon Mi-kyung</span>'
    },
    fam_bride: {
      ko: '<span class="family__parents">고흥락 · 이경희</span>의 장녀 <span class="family__name">미진</span>',
      en: '<span class="family__name">Mijin</span>, daughter of <span class="family__parents">Ko Heung-rak &amp; Lee Kyung-hee</span>'
    },

    /* ---- 갤러리 ---- */
    sec_gallery: { ko: '우리의 순간', en: 'Our Moments' },
    gallery_hint: { ko: '사진을 누르면 크게 볼 수 있습니다', en: 'Tap a photo to view it in full' },

    /* ---- 달력 ---- */
    sec_when: { ko: '예식일', en: 'The Wedding Day' },
    cal_time: {
      ko: '2026년 10월 25일 일요일 오후 12시 30분',
      en: 'Sunday, 25 October 2026 · 12:30 PM'
    },

    /* ---- 오시는 길 ---- */
    sec_loc: { ko: '오시는 길', en: 'Getting There' },
    loc_address: {
      ko: '서울 강남구 영동대로 325, S-TOWER<br/>(대치동 983-1)',
      en: 'S-Tower, 325 Yeongdong-daero, Gangnam-gu, Seoul<br/>(983-1 Daechi-dong)'
    },
    nav_naver: { ko: '네이버지도', en: 'Naver Map' },
    nav_kakao: { ko: '카카오맵', en: 'Kakao Map' },
    nav_tmap: { ko: '티맵', en: 'TMAP' },
    tr_subway_label: {
      ko: '<span class="transport__icon">🚇</span>지하철',
      en: '<span class="transport__icon">🚇</span>Subway'
    },
    tr_subway_body: {
      ko: '<strong>2호선 삼성역 3번 출구</strong> 도보 10분<br/><span class="transport__sub">삼성역 3번출구 앞 셔틀버스 5-10분 간격 운행</span>',
      en: '<strong>Samseong Stn. (Line 2), Exit 3</strong> — 10 min on foot<br/><span class="transport__sub">Shuttle bus every 5–10 min from Exit 3</span>'
    },
    tr_bus_label: {
      ko: '<span class="transport__icon">🚌</span>버스',
      en: '<span class="transport__icon">🚌</span>Bus'
    },
    tr_bus_body: {
      ko: '<strong>휘문고 / 대치2동 주민센터</strong> 하차<br/><span class="transport__sub">간선 343, 401 / 지선 4318, 4319<br/>일반 11-3, 917 / 직행 500-2, 9407, 9507, 9607</span>',
      en: '<strong>Whimoon High School / Daechi 2-dong Community Centre</strong> stop<br/><span class="transport__sub">Blue 343, 401 · Green 4318, 4319<br/>Local 11-3, 917 · Express 500-2, 9407, 9507, 9607</span>'
    },
    tr_park_label: {
      ko: '<span class="transport__icon">🅿️</span>주차',
      en: '<span class="transport__icon">🅿️</span>Parking'
    },
    tr_park_body: {
      ko: '<strong>2시간 무료 주차</strong>',
      en: '<strong>2 hours free parking</strong>'
    },

    /* ---- 마음 전하실 곳 ---- */
    sec_acc: { ko: '마음 전하실 곳', en: 'Congratulatory Gifts' },
    acc_intro: {
      ko: '축하의 마음을 담아<br/>축의금을 전달하실 수 있습니다.',
      en: 'For those who wish to share their congratulations,<br/>bank transfer details are provided below.'
    },
    acc_groom_side: { ko: '신랑측', en: "Groom's Side" },
    acc_bride_side: { ko: '신부측', en: "Bride's Side" },
    role_groom: { ko: '김준혁(신랑)', en: 'Kim Joonhyuk (Groom)' },
    role_gfather: { ko: '김삼채(신랑 부)', en: "Kim Sam-chae (Groom's Father)" },
    role_gmother: { ko: '문미경(신랑 모)', en: "Moon Mi-kyung (Groom's Mother)" },
    role_bride: { ko: '고미진(신부)', en: 'Ko Mijin (Bride)' },
    role_bfather: { ko: '고흥락(신부 부)', en: "Ko Heung-rak (Bride's Father)" },
    role_bmother: { ko: '이경희(신부 모)', en: "Lee Kyung-hee (Bride's Mother)" },
    bank_woori: { ko: '우리은행', en: 'Woori Bank' },
    bank_kb: { ko: '국민은행', en: 'KB Kookmin Bank' },
    bank_shinhan: { ko: '신한은행', en: 'Shinhan Bank' },
    bank_kakao: { ko: '카카오뱅크', en: 'KakaoBank' },
    bank_hana: { ko: '하나은행', en: 'Hana Bank' },
    bank_nh: { ko: '농협은행', en: 'NH NongHyup Bank' },
    btn_copy: { ko: '복사', en: 'Copy' },

    /* ---- 푸터 ---- */
    footer_share: { ko: '청첩장 공유하기', en: 'Share Invitation' },

    /* ---- 접근성 라벨 ---- */
    aria_lightbox: { ko: '사진 보기', en: 'Photo viewer' },
    aria_close: { ko: '닫기', en: 'Close' },
    aria_prev: { ko: '이전 사진', en: 'Previous photo' },
    aria_next: { ko: '다음 사진', en: 'Next photo' },
    aria_copy: { ko: '계좌번호 복사', en: 'Copy account number' }
  };

  /* JS가 동적으로 생성하는 문구 */
  var STR = {
    ko: {
      title: '준혁 ♥ 미진 결혼합니다 | 2026.10.25',
      dLeft: function (d) { return '준혁 &amp; 미진의 결혼식이 <strong>D-' + d + '</strong> 남았습니다'; },
      dToday: '오늘은 <strong>준혁 &amp; 미진</strong>의 결혼식 날입니다 ♥',
      dStarted: '<strong>결혼식이 시작되었습니다 ♥</strong>',
      copied: '계좌번호가 복사되었습니다',
      copyFail: '복사에 실패했습니다',
      linkCopied: '청첩장 링크가 복사되었습니다',
      shareFail: '공유에 실패했습니다',
      shareTitle: '준혁 ♥ 미진 결혼합니다',
      shareText: '2026년 10월 25일 일요일 12시 30분 · 노블발렌티 대치',
      photoAria: function (n) { return n + '번째 사진 크게 보기'; },
      photoAlt: function (n) { return '갤러리 사진 ' + n; },
      addPhotos: '사진을 추가해주세요'
    },
    en: {
      title: 'Joonhyuk ♥ Mijin | 25 October 2026',
      dLeft: function (d) { return "<strong>D-" + d + "</strong> until Joonhyuk &amp; Mijin's wedding"; },
      dToday: "Today is <strong>Joonhyuk &amp; Mijin</strong>'s wedding day ♥",
      dStarted: '<strong>The ceremony has begun ♥</strong>',
      copied: 'Account number copied',
      copyFail: 'Copy failed',
      linkCopied: 'Invitation link copied',
      shareFail: 'Could not share',
      shareTitle: 'Joonhyuk ♥ Mijin — Wedding Invitation',
      shareText: 'Sunday, 25 October 2026, 12:30 PM · Noble Valenti Daechi, Seoul',
      photoAria: function (n) { return 'View photo ' + n; },
      photoAlt: function (n) { return 'Gallery photo ' + n; },
      addPhotos: 'Please add photos'
    }
  };

  var LANG = 'ko';
  var LANG_STORE_KEY = 'kimko_lang';

  function detectLang() {
    // 1순위: URL 파라미터 (?lang=en)
    try {
      var q = new URLSearchParams(window.location.search).get('lang');
      if (q === 'en' || q === 'ko') return q;
    } catch (e) { /* 구형 브라우저 - 무시 */ }
    // 2순위: 이전에 선택한 언어
    try {
      var saved = localStorage.getItem(LANG_STORE_KEY);
      if (saved === 'en' || saved === 'ko') return saved;
    } catch (e) { /* 시크릿 모드 등 - 무시 */ }
    // 3순위: 브라우저 언어 감지
    var nav = (navigator.language || 'ko').toLowerCase();
    return nav.indexOf('ko') === 0 ? 'ko' : 'en';
  }

  function applyI18n() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (I18N[key] && I18N[key][LANG] != null) el.innerHTML = I18N[key][LANG];
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria');
      if (I18N[key] && I18N[key][LANG] != null) el.setAttribute('aria-label', I18N[key][LANG]);
    });
  }

  function setLang(lang) {
    LANG = lang === 'en' ? 'en' : 'ko';
    document.documentElement.lang = LANG;
    document.title = STR[LANG].title;
    applyI18n();

    document.querySelectorAll('.lang-toggle button').forEach(function (b) {
      b.classList.toggle('is-active', b.dataset.lang === LANG);
    });

    buildGrid();        // 갤러리 aria/alt 문구 갱신
    built = false;      // 라이트박스는 다음에 열 때 새 언어로 재생성
    updateCountdown();  // D-day 문구 갱신

    try { localStorage.setItem(LANG_STORE_KEY, LANG); } catch (e) { /* 무시 */ }
  }

  document.querySelectorAll('.lang-toggle button').forEach(function (btn) {
    btn.addEventListener('click', function () { setLang(btn.dataset.lang); });
  });

  /* ------------------------------------------------------------------
     1. PHOTO GALLERY (4x4 썸네일 그리드 + 전체화면 라이트박스)

     📷 사진 추가 방법:
        1) images/gallery/ 폴더에 원본 사진을 넣으세요 (예: photo1.JPG)
        2) 저장소 루트에서 python make_thumbs.py 를 실행하세요
           → thumbs/(그리드용)와 large/(라이트박스용) WebP가 자동 생성됩니다
        3) 아래 GALLERY_PHOTOS 배열에 원본 파일명을 추가하세요 (최대 16장 권장)
        4) 사진이 없으면 placeholder가 자동으로 표시됩니다
        ※ 파일 확장자 대소문자(.JPG / .jpg)를 실제 파일과 똑같이 맞추세요!
        ※ 화면에는 원본 대신 변환본만 로드됩니다 (원본은 다운로드되지 않음)

     동작:
        - 화면에는 4열 그리드로 썸네일을 보여줍니다.
        - 썸네일을 누르면 전체화면 라이트박스가 열리고,
          좌우 버튼 / 스와이프 / 키보드로 무한 반복하며 크게 볼 수 있습니다.
     ------------------------------------------------------------------ */
  const GALLERY_PHOTOS = [
    'gallery/KimKo_2.jpg',
    'gallery/Ko1.jpg',
    'gallery/Kim1.jpg',
    'gallery/KimKo_3.jpg',
    'gallery/Kim2.jpg',
    'gallery/Ko2.jpg',
    'gallery/Kim3.jpg',
    'gallery/KimKo_4.jpg',
    'gallery/Ko3.jpg',
    'gallery/Kim4.jpg',
    'gallery/Kim5.jpg',
    'gallery/KimKo_5.jpg',
    'gallery/Ko4.jpg',
    'gallery/KimKo_6.jpg',
    'gallery/Ko5.jpg',
    // 'gallery/photo16.JPG',
  ];

  // 사진이 하나도 없을 때 보여줄 placeholder 개수
  const PLACEHOLDER_COUNT = 16;

  const photoGrid = document.getElementById('photoGrid');

  const photos = GALLERY_PHOTOS.length > 0
    ? GALLERY_PHOTOS
    : Array.from({ length: PLACEHOLDER_COUNT }, function () { return null; });

  const total = photos.length;

  // 원본 경로(gallery/X.jpg) → 웹 표시용 경로 매핑 (make_thumbs.py가 생성)
  // 그리드는 thumbs/(긴 변 480px), 라이트박스는 large/(긴 변 1600px)를 사용
  function thumbSrc(src) {
    return 'images/' + src.replace('gallery/', 'gallery/thumbs/').replace(/\.[^.]+$/, '.webp');
  }
  function largeSrc(src) {
    return 'images/' + src.replace('gallery/', 'gallery/large/').replace(/\.[^.]+$/, '.webp');
  }

  /* ---- (A) 썸네일 그리드 생성 ---- */
  function buildGrid() {
    if (!photoGrid) return;
    const html = [];
    for (let i = 0; i < total; i++) {
      const src = photos[i];
      if (src) {
        html.push(
          '<button type="button" class="grid__item" data-index="' + i + '" aria-label="' + STR[LANG].photoAria(i + 1) + '">' +
            '<img src="' + thumbSrc(src) + '" alt="' + STR[LANG].photoAlt(i + 1) + '" loading="lazy" decoding="async" />' +
          '</button>'
        );
      } else {
        html.push(
          '<div class="grid__item grid__item--placeholder">' +
            '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">' +
              '<rect x="6" y="14" width="52" height="40" rx="3" stroke="currentColor" stroke-width="1.5"/>' +
              '<circle cx="44" cy="26" r="3" fill="currentColor"/>' +
              '<path d="M6 44 L22 30 L34 40 L44 32 L58 44" stroke="currentColor" stroke-width="1.5" fill="none"/>' +
            '</svg>' +
          '</div>'
        );
      }
    }
    photoGrid.innerHTML = html.join('');
  }

  // 클릭 리스너는 한 번만 등록 (buildGrid는 언어 전환 시 재실행되므로)
  if (photoGrid) {
    photoGrid.addEventListener('click', function (e) {
      const item = e.target.closest('.grid__item');
      if (!item || item.classList.contains('grid__item--placeholder')) return;
      const idx = parseInt(item.dataset.index, 10);
      openLightbox(idx);
    });
  }

  /* ---- (B) 라이트박스 (무한 반복 슬라이더) ---- */
  const lightbox = document.getElementById('lightbox');
  const lbTrack = document.getElementById('lbTrack');
  const lbClose = document.getElementById('lbClose');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');
  const lbCurrent = document.getElementById('lbCurrent');
  const lbTotal = document.getElementById('lbTotal');

  lbTotal.textContent = total;

  // currentIndex: 원본 인덱스 (0 ~ total-1)
  // trackIndex:   track 상의 실제 위치 (앞 클론 1개 포함, 1 ~ total)
  let currentIndex = 0;
  let trackIndex = 1;
  let isAnimating = false;
  let built = false;

  function lbSlideHTML(src, idx) {
    if (src) {
      return '<div class="lightbox__slide"><img src="' + largeSrc(src) + '" alt="' + STR[LANG].photoAlt(idx + 1) + '" loading="lazy" /></div>';
    }
    return '<div class="lightbox__slide lightbox__slide--placeholder"><span>' + STR[LANG].addPhotos + '</span></div>';
  }

  function buildLightboxSlides() {
    const html = [];
    html.push(lbSlideHTML(photos[total - 1], total - 1)); // 앞 클론
    for (let i = 0; i < total; i++) html.push(lbSlideHTML(photos[i], i)); // 원본
    html.push(lbSlideHTML(photos[0], 0)); // 뒤 클론
    lbTrack.innerHTML = html.join('');
    built = true;
  }

  function setTrackPos(idx, animate) {
    if (animate === undefined) animate = true;
    lbTrack.classList.toggle('lightbox__track--no-transition', !animate);
    lbTrack.style.transform = 'translateX(-' + (idx * 100) + '%)';
  }

  function updateCounter() {
    lbCurrent.textContent = currentIndex + 1;
  }

  function lbNextSlide() {
    if (isAnimating) return;
    isAnimating = true;
    trackIndex++;
    setTrackPos(trackIndex, true);
    currentIndex = (currentIndex + 1) % total;
    updateCounter();
  }

  function lbPrevSlide() {
    if (isAnimating) return;
    isAnimating = true;
    trackIndex--;
    setTrackPos(trackIndex, true);
    currentIndex = (currentIndex - 1 + total) % total;
    updateCounter();
  }

  // 클론 → 원본 점프 (무한 반복)
  lbTrack.addEventListener('transitionend', function () {
    isAnimating = false;
    if (trackIndex === total + 1) {
      trackIndex = 1;
      setTrackPos(trackIndex, false);
    } else if (trackIndex === 0) {
      trackIndex = total;
      setTrackPos(trackIndex, false);
    }
  });

  function openLightbox(idx) {
    if (!built) buildLightboxSlides();
    currentIndex = idx;
    trackIndex = idx + 1;
    setTrackPos(trackIndex, false);
    updateCounter();
    lightbox.classList.add('lightbox--open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('lightbox--open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', lbPrevSlide);
  lbNext.addEventListener('click', lbNextSlide);

  // 배경(어두운 영역) 클릭 시 닫기
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox || e.target.id === 'lbStage') closeLightbox();
  });

  // 키보드 (라이트박스 열렸을 때만)
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('lightbox--open')) return;
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowLeft') lbPrevSlide();
    else if (e.key === 'ArrowRight') lbNextSlide();
  });

  // 스와이프 (터치)
  let touchStartX = null;
  let touchStartY = null;
  let touchMoved = false;

  lbTrack.addEventListener('touchstart', function (e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchMoved = false;
  }, { passive: true });

  lbTrack.addEventListener('touchmove', function (e) {
    if (touchStartX === null) return;
    const dx = e.touches[0].clientX - touchStartX;
    const dy = e.touches[0].clientY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy)) touchMoved = true;
  }, { passive: true });

  lbTrack.addEventListener('touchend', function (e) {
    if (touchStartX === null || !touchMoved) {
      touchStartX = null;
      return;
    }
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      dx > 0 ? lbPrevSlide() : lbNextSlide();
    }
    touchStartX = null;
    touchStartY = null;
  }, { passive: true });

  /* ------------------------------------------------------------------
     2. ACCOUNT NUMBER COPY (계좌번호 복사)
     ------------------------------------------------------------------ */
  function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('toast--show');
    setTimeout(function () {
      toast.classList.remove('toast--show');
    }, 1800);
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        document.body.removeChild(ta);
        resolve();
      } catch (err) {
        document.body.removeChild(ta);
        reject(err);
      }
    });
  }

  document.querySelectorAll('.account__copy').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      const num = btn.dataset.copy;
      copyText(num)
        .then(function () { showToast(STR[LANG].copied); })
        .catch(function () { showToast(STR[LANG].copyFail); });
    });
  });

  /* ------------------------------------------------------------------
     3. SHARE (공유)
     ------------------------------------------------------------------ */
  const shareBtn = document.getElementById('shareBtn');
  if (shareBtn) {
    shareBtn.addEventListener('click', async function () {
      const shareData = {
        title: STR[LANG].shareTitle,
        text: STR[LANG].shareText,
        url: window.location.href,
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          // 사용자가 취소했거나 에러 - 무시
        }
      } else {
        copyText(window.location.href)
          .then(function () { showToast(STR[LANG].linkCopied); })
          .catch(function () { showToast(STR[LANG].shareFail); });
      }
    });
  }

  /* ------------------------------------------------------------------
     4. D-DAY COUNTDOWN
     ------------------------------------------------------------------ */
  function updateCountdown() {
    const el = document.getElementById('countdown');
    if (!el) return;

    const weddingDate = new Date('2026-10-25T12:30:00+09:00');
    const now = new Date();
    const diff = weddingDate - now;

    if (diff < 0) {
      el.innerHTML = STR[LANG].dStarted;
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days > 0) {
      el.innerHTML = STR[LANG].dLeft(days);
    } else {
      el.innerHTML = STR[LANG].dToday;
    }
  }

  /* ------------------------------------------------------------------
     5. VISITOR COUNTER (Today / Total 방문자 수)

     📊 설정 방법 (GoatCounter — 무료):
        1) https://www.goatcounter.com 에서 가입하고 코드를 정합니다.
           (예: 코드가 kimko-wedding 이면 → kimko-wedding.goatcounter.com)
        2) 아래 GOATCOUNTER_CODE를 본인 코드로 바꿉니다.
        3) index.html 하단의 count.js <script> 태그 안 MYCODE도 바꿉니다.
        4) GoatCounter 사이트 Settings에서
           "Allow adding visitor counts on your website"를 체크합니다.
           (기본값이 꺼져 있어서 안 켜면 카운터가 표시되지 않습니다)

     ※ 코드를 아직 안 바꿨으면 카운터 영역은 자동으로 숨겨집니다.
     ※ GoatCounter 응답은 최대 4시간 캐시되므로 숫자가 실시간은 아닙니다.
     ------------------------------------------------------------------ */
  var GOATCOUNTER_CODE = 'MYCODE'; // ← 본인의 GoatCounter 코드로 교체

  function initVisitorCounter() {
    var wrap = document.getElementById('footerVisitors');
    if (!wrap) return;
    if (!GOATCOUNTER_CODE || GOATCOUNTER_CODE === 'MYCODE' || !window.fetch) {
      wrap.style.display = 'none';
      return;
    }

    var base = 'https://' + GOATCOUNTER_CODE + '.goatcounter.com/counter/TOTAL.json';
    // 한국 시간 기준 오늘 날짜 (YYYY-MM-DD)
    var today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Seoul' }).format(new Date());

    function parseCount(data) {
      // GoatCounter는 "1 234"처럼 천 단위 구분자가 섞인 문자열을 반환
      var raw = String(data && data.count != null ? data.count : '').replace(/[^0-9]/g, '');
      return raw === '' ? '0' : parseInt(raw, 10).toLocaleString();
    }

    Promise.all([
      fetch(base).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }),
      fetch(base + '?start=' + today + '&end=' + today).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    ]).then(function (res) {
      document.getElementById('visitTotal').textContent = parseCount(res[0]);
      document.getElementById('visitToday').textContent = parseCount(res[1]);
    }).catch(function () {
      // 아직 집계 데이터가 없거나(404) 네트워크 오류 → 조용히 숨김
      wrap.style.display = 'none';
    });
  }

  /* ------------------------------------------------------------------
     초기화
     ------------------------------------------------------------------ */
  setLang(detectLang());                       // 언어 적용 + 갤러리 생성 + D-day 표시
  setInterval(updateCountdown, 1000 * 60 * 60); // 1시간마다 D-day 갱신
  initVisitorCounter();                        // 방문자 수 표시
})();
