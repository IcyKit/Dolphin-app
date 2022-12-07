const createBlogs = async () => {
  const getBlogs = async () => {
    const messagesResponse = await fetch('./data.json');
    const messagesData = await messagesResponse.json();
    return messagesData.blogs;
  };
  const blogs = await getBlogs();
  const makeBlogs = () => {
    const blogsList = document.querySelector('#bloggers__content');
    const blogItem = document.createElement('div');
    blogs.forEach((item) => {
      blogItem.innerHTML += `
      <div class="blogger">
                <div class="blogger__left">
                  <img src=${item.avatar} alt="avatar" />
                  <div class="blogger__title">
                    <h4>${item.name}</h4>
                    <p>${item.nickname}</p>
                  </div>
                </div>
                <div class="btn">Читать</div>
              </div>
      `;
    });
    blogsList.append(blogItem);
  };
  makeBlogs();
};

export default createBlogs;
