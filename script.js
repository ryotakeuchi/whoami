document.addEventListener('DOMContentLoaded', () => {

  // ===== 画像ホバープレビュー機能 =====
  const allProjectBoxes = document.querySelectorAll('.project-box');
  const imagePreview = document.getElementById('image-preview-container');

  if (imagePreview) {
      const moveImagePreview = (e) => {
          const x = e.clientX + 15;
          const y = e.clientY + 15;
          imagePreview.style.left = `${x}px`;
          imagePreview.style.top = `${y}px`;
      };

      allProjectBoxes.forEach(box => {
          box.addEventListener('mouseenter', () => {
              const imagePath = box.dataset.image;
              if (imagePath) {
                  imagePreview.style.backgroundImage = `url(${imagePath})`;
                  imagePreview.classList.add('visible');
                  window.addEventListener('mousemove', moveImagePreview);
              }
          });

          box.addEventListener('mouseleave', () => {
              imagePreview.classList.remove('visible');
              window.removeEventListener('mousemove', moveImagePreview);
          });
      });
  }


  // ★★★★★ フィルター機能 ここから ★★★★★
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projects = document.querySelectorAll('.project-list-wrapper .project-box');

  filterButtons.forEach(button => {
      button.addEventListener('click', () => {
          // クリックされたボタンの値を取得
          const filterValue = button.dataset.filter;

          // まず、すべてのボタンから 'active' クラスを削除
          filterButtons.forEach(btn => btn.classList.remove('active'));
          // 次に、クリックされたボタンに 'active' クラスを追加
          button.classList.add('active');

          // 各プロジェクトをチェックして、表示/非表示を切り替える
          projects.forEach(project => {
              if (filterValue === 'all') {
                  // "All" が選択された場合は、すべてのプロジェクトを表示
                  project.classList.remove('hidden');
              } else {
                  // 特定のタグが選択された場合
                  let isMatch = false;
                  // プロジェクト内のすべてのタグ（カテゴリと年）を取得
                  const tagsInProject = project.querySelectorAll('.tag, .year-tag');
                  
                  tagsInProject.forEach(tag => {
                      if (tag.textContent === filterValue) {
                          isMatch = true;
                      }
                  });

                  // マッチするタグがあれば表示、なければ非表示
                  if (isMatch) {
                      project.classList.remove('hidden');
                  } else {
                      project.classList.add('hidden');
                  }
              }
          });
      });
  });
  // ★★★★★ フィルター機能 ここまで ★★★★★




// ★★★★★ ページが読み込まれたら、一定時間後にローディング画面を非表示にする処理を追加 ★★★★★
document.body.classList.add('loading-active');

window.addEventListener('load', () => {
    const loader = document.getElementById('loading-screen');
    
    setTimeout(() => {
        loader.classList.add('loaded');
        document.body.classList.remove('loading-active');
    }, 1500); // 1.5秒表示。短くしたい場合は1000に変更
});
// ★★★★★ ローディング画面の設定　ここまで ★★★★★














});