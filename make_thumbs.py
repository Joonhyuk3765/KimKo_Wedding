# -*- coding: utf-8 -*-
"""
make_thumbs.py — 모바일 청첩장 갤러리 이미지 최적화 스크립트

원본은 그대로 두고, 웹 표시용으로 작은 버전 2종을 만듭니다.

    images/gallery/           ← 원본 (건드리지 않음)
    images/gallery/thumbs/    ← 그리드 썸네일용   (긴 변 480px,  WebP)
    images/gallery/large/     ← 라이트박스 확대용 (긴 변 1600px, WebP)

사용법:
    1) pip install Pillow           (최초 1회)
    2) 이 파일을 저장소 루트(index.html 있는 곳)에 두고
    3) python make_thumbs.py
    4) 생성된 thumbs/, large/ 폴더를 함께 커밋·푸시

사진을 나중에 추가할 때도 gallery/에 원본을 넣고
이 스크립트를 다시 실행하면 됩니다 (전체 재생성, 수 초 소요).
"""

import sys
from pathlib import Path

try:
    from PIL import Image, ImageOps
except ImportError:
    sys.exit("Pillow가 필요합니다. 먼저 실행하세요:  pip install Pillow")

# ── 설정 ─────────────────────────────────────────────
GALLERY_DIR = Path("images/gallery")
VARIANTS = {
    "thumbs": {"long_side": 480,  "quality": 78},   # 4열 그리드용
    "large":  {"long_side": 1600, "quality": 82},   # 전체화면 라이트박스용
}
EXTENSIONS = {".jpg", ".jpeg", ".png"}  # 대소문자 무관
# ─────────────────────────────────────────────────────


def human(n: int) -> str:
    return f"{n/1048576:.1f} MB" if n >= 1048576 else f"{n/1024:.0f} KB"


def convert(src: Path, dst: Path, long_side: int, quality: int) -> int:
    with Image.open(src) as im:
        im = ImageOps.exif_transpose(im)          # 회전 정보 반영
        if im.mode not in ("RGB", "L"):
            im = im.convert("RGB")
        im.thumbnail((long_side, long_side), Image.LANCZOS)
        im.save(dst, "WEBP", quality=quality, method=6)
    return dst.stat().st_size


def main() -> None:
    if not GALLERY_DIR.is_dir():
        sys.exit(f"'{GALLERY_DIR}' 폴더가 없습니다. 저장소 루트에서 실행하세요.")

    originals = sorted(
        p for p in GALLERY_DIR.iterdir()
        if p.is_file() and p.suffix.lower() in EXTENSIONS
    )
    if not originals:
        sys.exit(f"'{GALLERY_DIR}'에 변환할 이미지가 없습니다.")

    for name, opt in VARIANTS.items():
        (GALLERY_DIR / name).mkdir(exist_ok=True)

    total_before = total_thumb = total_large = 0
    print(f"{'파일':<18}{'원본':>10}{'thumbs':>10}{'large':>10}")
    print("-" * 48)

    for src in originals:
        before = src.stat().st_size
        sizes = {}
        for name, opt in VARIANTS.items():
            dst = GALLERY_DIR / name / (src.stem + ".webp")
            sizes[name] = convert(src, dst, opt["long_side"], opt["quality"])
        total_before += before
        total_thumb += sizes["thumbs"]
        total_large += sizes["large"]
        print(f"{src.name:<18}{human(before):>10}{human(sizes['thumbs']):>10}{human(sizes['large']):>10}")

    print("-" * 48)
    print(f"{'합계':<18}{human(total_before):>10}{human(total_thumb):>10}{human(total_large):>10}")
    print(f"\n그리드 첫 로딩: {human(total_before)} → {human(total_thumb)} "
          f"({total_before/max(total_thumb,1):.0f}배 감소)")
    print("생성 완료. thumbs/ 와 large/ 폴더를 커밋·푸시하세요.")


if __name__ == "__main__":
    main()
