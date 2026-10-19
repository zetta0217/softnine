// 데모 영상: 화면에 보일 때 재생, 아래 컨트롤 바, 누르면 전체 화면, 탭 전환
(function () {
  // 영상은 화면에 보일 때만 재생 (직접 정지한 영상은 다시 틀지 않음)
  const videos = document.querySelectorAll('.demo video');
  const vio = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { if (!e.target.dataset.userPaused) e.target.play().catch(() => {}); }
      else e.target.pause();
    });
  }, { threshold: 0.4 });

  const ICON_PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
  const ICON_PAUSE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>';
  const fmt = (s) => isFinite(s) ? Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0') : '-:--';

  videos.forEach((v) => {
    vio.observe(v);
    // 누르면 전체 화면으로 크게 보기
    v.addEventListener('click', () => {
      if (v.requestFullscreen) v.requestFullscreen();
      else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen();
    });

    // 영상 아래 재생/정지 버튼 + 진행바 + 시간
    const bar = document.createElement('div');
    bar.className = 'vc';
    bar.innerHTML =
      '<button class="vc-play" type="button"></button>' +
      '<input class="vc-seek" type="range" min="0" max="1000" step="1" value="0" aria-label="재생 위치">' +
      '<span class="vc-time">0:00 / -:--</span>';
    v.closest('.demo').appendChild(bar);
    const btn = bar.querySelector('.vc-play');
    const seek = bar.querySelector('.vc-seek');
    const time = bar.querySelector('.vc-time');
    let dragging = false;

    const syncBtn = () => {
      btn.innerHTML = v.paused ? ICON_PLAY : ICON_PAUSE;
      btn.setAttribute('aria-label', v.paused ? '재생' : '정지');
    };
    const syncTime = () => {
      const p = v.duration ? v.currentTime / v.duration : 0;
      if (!dragging) seek.value = Math.round(p * 1000);
      seek.style.setProperty('--p', (seek.value / 10) + '%');
      time.textContent = fmt(v.currentTime) + ' / ' + fmt(v.duration);
    };
    syncBtn();

    btn.addEventListener('click', () => {
      if (v.paused) { delete v.dataset.userPaused; v.play().catch(() => {}); }
      else { v.dataset.userPaused = '1'; v.pause(); }
    });
    seek.addEventListener('input', () => {
      dragging = true;
      if (v.duration) v.currentTime = seek.value / 1000 * v.duration;
      syncTime();
    });
    seek.addEventListener('change', () => { dragging = false; });
    v.addEventListener('play', syncBtn);
    v.addEventListener('pause', syncBtn);
    v.addEventListener('timeupdate', syncTime);
    v.addEventListener('loadedmetadata', syncTime);
  });

  // 탭을 누르면 같은 자리의 영상을 바꿔 재생
  document.querySelectorAll('.tabs').forEach((tabs) => {
    const video = tabs.closest('.feature, .feature-wide').querySelector('video');
    tabs.addEventListener('click', (ev) => {
      const tab = ev.target.closest('.tab');
      if (!tab || tab.classList.contains('is-active')) return;
      tabs.querySelectorAll('.tab').forEach((t) => {
        const on = t === tab;
        t.classList.toggle('is-active', on);
        t.setAttribute('aria-selected', on);
      });
      video.poster = 'assets/img/lavender/' + tab.dataset.src + '.jpg';
      video.src = 'assets/video/lavender/' + tab.dataset.src + '.mp4';
      delete video.dataset.userPaused;
      video.play().catch(() => {});
    });
  });
})();
