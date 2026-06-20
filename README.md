# 모바일 청첩장 - 준혁 ♥ 미진

2026년 10월 25일 일요일 12:30, 노블발렌티 대치에서 진행되는 결혼식의 모바일 청첩장입니다.

## 📁 파일 구조

```
wedding-invitation/
├── index.html         # 메인 HTML
├── styles.css         # 스타일
├── script.js          # 인터랙션 (슬라이더, 복사 등)
├── README.md          # 이 파일
└── images/
    ├── map-1.jpg      # 약도 (이미 포함됨)
    └── gallery/       # 갤러리 사진 폴더 (사진 추가 필요)
        ├── photo1.jpg
        ├── photo2.jpg
        └── ...
```

## 📷 사진 추가하기 (최대 16장 권장)

갤러리는 **4열 썸네일 그리드**로 표시되고, 썸네일을 누르면 **전체화면**으로 좌우로 넘겨보며 무한 반복할 수 있습니다.

1. `images/gallery/` 폴더에 본인 사진을 넣으세요 (예: `photo1.JPG` ~ `photo16.JPG`)
   - 형식: jpg, jpeg, png, webp 모두 가능
   - 그리드 썸네일은 정사각형으로 잘려 보이고, 크게 볼 때는 원본 비율 그대로 표시됩니다
2. `script.js`를 열어서 상단의 `GALLERY_PHOTOS` 배열에 파일명을 추가하세요:

```javascript
const GALLERY_PHOTOS = [
  'gallery/photo1.JPG',
  'gallery/photo2.JPG',
  'gallery/photo3.JPG',
  'gallery/photo4.JPG',
  // ... 16장까지 (앞의 // 주석을 지우면 활성화됩니다)
];
```

> ⚠️ **확장자 대소문자 주의**: 실제 파일이 `photo1.JPG`(대문자)면 배열에도 `.JPG`로,
> `photo1.jpg`(소문자)면 `.jpg`로 똑같이 맞춰야 합니다. GitHub Pages는 대소문자를 구분합니다.

사진이 하나도 없으면 placeholder가 표시됩니다.

## ✏️ 내용 수정하기

`index.html`에서 다음 부분을 직접 수정할 수 있습니다:

| 항목 | 위치 | 비고 |
|---|---|---|
| 신랑/신부 이름 | `<span class="cover__name">준혁</span>` | 한글 이름 |
| 부모님 이름 | `<span class="family__parents">○○○ · ○○○</span>` | 인사말 섹션 |
| 인사말 | `.greeting__body` 단락 | 원하는 문구로 수정 |
| 영문 표기 | `JOONHYUK & MIJIN` | Footer 부분 |
| Open Graph 제목/설명 | `<meta property="og:...">` | 카카오톡 공유 시 미리보기 |

### 💳 계좌번호 수정 (양가 부모님 포함)

하단 **"마음 전하실 곳"** 섹션에 신랑측 / 신부측 그룹이 있고, 각 그룹 안에 본인·아버지·어머니 3개 계좌가 들어있습니다.

> ⚠️ **신랑·신부 본인 계좌는 실제 값**, **부모님 4개 계좌는 예시 값**입니다. 부모님 계좌는 직접 수정하세요.

각 계좌 카드에서 **세 곳**을 똑같이 바꿔야 합니다 (`은행명`, 화면에 보일 `번호`, 복사용 `data-copy`):

```html
<div class="account__card account__card--full">
  <p class="account__role">아버지</p>
  <p class="account__bank">국민은행</p>                        <!-- ① 은행명 -->
  <p class="account__number" data-account="12345601234567">
    <span>123456-01-234567</span>                              <!-- ② 화면 표시용 (하이픈 OK) -->
    <button ... data-copy="12345601234567" ...>복사</button>   <!-- ③ 복사용 (숫자만!) -->
  </p>
</div>
```

- **②번**(`<span>`)은 보기 좋게 하이픈을 넣어도 됩니다.
- **③번**(`data-copy`)은 복사 버튼이 클립보드에 넣는 값이라 **하이픈 없이 숫자만** 권장합니다.

현재 예시로 들어간 부모님 계좌:

| 구분 | 은행 (예시) | 번호 (예시) |
|---|---|---|
| 신랑 아버지 | 국민은행 | 123456-01-234567 |
| 신랑 어머니 | 신한은행 | 110-222-333444 |
| 신부 아버지 | 하나은행 | 987-654098-76543 |
| 신부 어머니 | 농협은행 | 352-0123-4567-89 |

## 🚀 GitHub Pages 배포 방법

### 방법 1: 새 저장소에 배포

1. GitHub에서 새 저장소 생성 (예: `wedding-invitation`)
2. 로컬에서:
   ```bash
   cd wedding-invitation
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<본인아이디>/wedding-invitation.git
   git push -u origin main
   ```
3. GitHub 저장소 → **Settings → Pages**
4. **Source**: `Deploy from a branch`
5. **Branch**: `main` / `/ (root)` 선택 후 **Save**
6. 약 1-2분 후 `https://<본인아이디>.github.io/wedding-invitation/` 에서 접속 가능

### 방법 2: 개인 도메인 (`<아이디>.github.io`)

1. `<본인아이디>.github.io` 라는 이름의 저장소 생성
2. 파일을 push하면 `https://<본인아이디>.github.io/` 에서 바로 접속 가능

## 📱 카카오톡 공유 미리보기

`index.html`의 `<meta property="og:image">` 태그가 미리보기 이미지를 결정합니다.
배포 후, 카카오톡 공유 시 미리보기 이미지가 나오게 하려면:

1. `images/og-thumbnail.jpg`에 800x800 정도의 대표 이미지를 넣으세요
2. (선택) [카카오 디벨로퍼스 - 디버거](https://developers.kakao.com/tool/clear/og)에서 캐시 갱신

## ✨ 주요 기능

- 📱 **모바일 최적화** (max-width 460px 컨테이너)
- 🖼️ **무한 반복 사진 슬라이더** (좌우 버튼 + 도트 + 스와이프 + 키보드 화살표)
- 📋 **계좌번호 복사** (클릭 한 번에 클립보드 복사 + 토스트 알림)
- 📍 **네이버지도/카카오맵/티맵 길찾기** 바로가기
- 🔗 **공유 기능** (Web Share API 지원 / 미지원 시 URL 복사)
- ⏰ **D-day 카운트다운**

## 🎨 디자인 커스터마이징

`styles.css` 최상단의 `:root` 변수에서 색상을 바꿀 수 있습니다:

```css
:root {
  --bg: #f5f1ea;        /* 배경 */
  --paper: #fbf8f3;     /* 종이색 */
  --ink: #2b2b27;       /* 본문 */
  --accent: #4a5d4a;    /* 포인트 (딥 그린) */
  --gold: #a08a5a;      /* 골드 라인 */
  --sun: #c44a3a;       /* 일요일 표시 */
}
```

## 📞 문의 정보 (예식장)

- **노블발렌티 대치점**: 02-539-0400
- **주소**: 서울 강남구 영동대로 325, S-TOWER

---

> 본 청첩장은 정적 사이트로, 별도의 서버나 빌드 과정 없이 GitHub Pages에 바로 배포됩니다.
