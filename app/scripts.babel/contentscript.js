'use strict';

const toggleTemplate = `
  <div class="checkbox-on-off">
    <label for="comment-toggle-checkbox">show/hide</label>
    <span class="yt-uix-checkbox-on-off">
      <input id="comment-toggle-checkbox" type="checkbox">
      <label for="comment-toggle-checkbox" id="comment-toggle-checkbox-label">
        <span class="checked"></span>
        <span class="toggle"></span>
        <span class="unchecked"></span>
      </label>
    </span>
  </div>`;

const addCommentToggle = (commentElements) => {
  const template = document.createElement('template');
  template.innerHTML = toggleTemplate;

  const commentHeader = document.querySelector('.comment-section-header-renderer');

  commentHeader.parentNode.insertBefore(template.content.firstElementChild, commentHeader);

  document.querySelector('input#comment-toggle-checkbox').addEventListener('change', (event) => {
    event.target.checked ?
      commentElements.forEach(el => el.classList.remove('not-shown')) :
      commentElements.forEach(el => el.classList.add('not-shown'));
  });
};

const observerConfig = {
  attributes: false,
  childList: true,
  characterData: false
};

const isSubscribed = Boolean(document.querySelector('.yt-uix-subscription-button').getAttribute('data-is-subscribed'));

const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (mutation.type === 'childList') {
      if (! isSubscribed) {
        const commentElements = [
          document.querySelector('.comment-section-sort-menu'),
          document.querySelector('.comment-section-renderer-items'),
          document.querySelector('.comment-section-renderer-paginator')
        ];
        commentElements.forEach(el => el.classList.add('not-shown'));
        addCommentToggle(commentElements);
        observer.disconnect();
      } else {
        observer.disconnect();
      }
    }
  });
});

observer.observe(document.getElementById('watch-discussion'), observerConfig);
