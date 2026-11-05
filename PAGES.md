# 기존 GitHub Pages 주소로 배포

공개 주소: https://ssw140414-a11y.github.io/aisoc/

## 수정 후 업데이트

1. 이 프로젝트에서 화면과 내용을 수정합니다. 로컬 관리자에서 바꾼 내용은 저장해야 `data/site.json`에 반영됩니다.
2. `npm run build:pages`로 정적 배포 빌드를 확인합니다. Windows PowerShell에서 실행 정책 오류가 나면 `npm.cmd run build:pages`를 사용합니다.
3. 변경 내용을 저장소의 `main` 브랜치에 커밋하고 푸시합니다.
4. GitHub의 Actions에서 **Deploy AI-SoC website**가 완료되면 같은 공개 주소가 업데이트됩니다. Pages 반영에는 시간이 걸릴 수 있습니다.

GitHub Pages 설정은 기존과 같이 `gh-pages` 브랜치의 `/ (root)`를 사용합니다. 워크플로는 정적 파일을 이 브랜치에 반영하고 Pages 빌드를 요청합니다.

## 배포에 포함되는 기능

공개 페이지, 모바일 메뉴, 로고 애니메이션, 구성원 분류 및 논문 분류를 지원합니다. `?group=professor`, `?group=researchers`, `?group=alumni`와 `?type=conference`, `?type=journal`은 브라우저에서 처리합니다.

관리자와 API는 정적 결과물에서 제외됩니다. 공개 서버에서 비밀번호나 수정 내용을 저장하지 않습니다. 관리자 기능은 로컬에서 계속 사용할 수 있습니다.

## 빌드 분리

`scripts/build-pages.mjs`는 공개 코드와 데이터만 `.pages-build`에 복사하고 정적 빌드를 수행합니다. 로컬 `.env` 파일, 개발 서버 빌드, 관리자 경로는 복사하지 않습니다. 결과물은 `.pages-build/out`입니다. 원본 개발 앱은 계속 `npm run dev`로 실행합니다.

기존 Jekyll 사이트는 이전 Git 커밋 기록에 남습니다. 필요하면 해당 커밋으로 복구할 수 있습니다. `DEPLOYMENT.md`의 Docker 안내는 별도 서버에서 관리자까지 운영할 때만 해당합니다.
