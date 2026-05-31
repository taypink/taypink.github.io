function initCategoryFold() {
  const categoryLists = document.querySelector('.category-lists');
  if (!categoryLists) return;
  
  // 找到独立分类页中所有包含子分类的项
  const itemsWithChild = categoryLists.querySelectorAll('.category-list-item');
  itemsWithChild.forEach(item => {
    // 【防重复挂载】如果已经有箭头了，就不再重复添加
    if (item.querySelector('.fold-arrow-btn')) return;

    const childList = item.querySelector('.category-list-child');
    if (childList) {
      // 默认隐藏子分类
      childList.style.display = 'none';
      
      // 创建折叠小箭头
      const btn = document.createElement('span');
      btn.className = 'fold-arrow-btn'; // 加一个类名方便识别
      btn.innerHTML = ' ◀';
      btn.style.cursor = 'pointer';
      btn.style.display = 'inline-block';
      btn.style.transition = 'transform 0.2s';
      btn.style.color = '#99a9bf';
      btn.style.marginLeft = '5px';
      
      // 把箭头插在分类数字或链接后面
      const count = item.querySelector('.category-list-count') || item.querySelector('.category-list-link');
      if (count) count.after(btn);
      
      // 点击小箭头时切换展开/折叠状态
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); // 阻止冒泡
        if (childList.style.display === 'block') {
          childList.style.display = 'none';
          btn.style.transform = 'none'; // 恢复箭头指向
        } else {
          childList.style.display = 'block';
          btn.style.transform = 'rotate(-90deg)'; // 箭头向下
        }
      });
    }
  });
}

// 1. 兼容页面首次打开/完全刷新的情况
document.addEventListener('DOMContentLoaded', initCategoryFold);

// 2. 兼容 Butterfly 主题 PJAX 局部刷新完成后的情况
document.addEventListener('pjax:complete', initCategoryFold);