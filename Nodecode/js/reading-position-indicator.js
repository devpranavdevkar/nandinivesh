function ReadingPositionIndicator(options){const{progressBar:progressBarSelector,content:contentSelector,}=options;const progressBar=getNodeObj(progressBarSelector);const content=getNodeObj(contentSelector);if(!progressBar.node||!content.node)return;movePositionIndicator(progressBar.node,content.node);localScroll(()=>movePositionIndicator(progressBar.node,content.node))}
function movePositionIndicator(progressBar,content){const start=document.body.scrollTop||document.documentElement.scrollTop;const end=content.offsetHeight;const scrolled=(start/end)*100;progressBar.style.width=`${scrolled}%`}