const trackSocialLinksClick = () => {
  const parentId = 'socialButtons';
  const parentEl = document.getElementById(parentId);

  function track(event) {
    if (event.target.parentNode.tagName === 'A') {
      gtag('event', 'social_link_click', {
        socialLinkId: event.target.parentNode.id,
        url: event.target.parentNode.href,
      });
    }
  }

  parentEl.removeEventListener('click', track);
  parentEl.addEventListener('click', track);
}
