//import { email, listen, fbButton, tw, linkedin } from "./utils";

function SocialShare(options) {
  const {
    metaData,
    twitter: twitterSelector,
    facebook: facebookSelector,
    linkedin: linkedinSelector,
    email: emailSelector,
    whatsapp: whatsappSelector,
  } = options;
  const { url, title, hashtags, description } = metaData;

  // Facebook
  listen("click", facebookSelector, () => {
    fbButton({ url });
  });

  // Twitter
  listen("click", twitterSelector, () => {
    tw({ url, title, hashtags });
  });

  // LinkedIn
  listen("click", linkedinSelector, () => {
    linkedin({ url });
  });

  // Email
  listen("click", emailSelector, () => {
    email({ url, title, description });
  });
  // Whatsapp
  listen("click", whatsappSelector, () => {
    whatsapp({ url, title, description });
  });
}
