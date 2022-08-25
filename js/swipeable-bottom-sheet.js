let bottomSheets=[];let openedInstances=[];let ID_COUNTER=0;const defaultOptions={overlay:!0,peek:"35vh",};class SwipeableBottomSheet{constructor(options){this.options={...defaultOptions,...options,};this.bottomSheet=$id(this.options.bottomSheetId);if(!this.bottomSheet){this.bottomSheet=bottomSheets.find(sheet=>sheet.getAttribute("id")===this.options.bottomSheetId,)}
if(this.bottomSheet){bottomSheets=[...bottomSheets,this.bottomSheet.cloneNode(!0)];this.bottomSheet.remove()}
this.trigger=$id(this.options.triggerId);if(!this.bottomSheet||!this.trigger)return!1;this.openBottomSheet=this.openBottomSheet.bind(this);this.onScroll=this.onScroll.bind(this);this.enableInteractivity=this.enableInteractivity.bind(this);this.disableInteractivity=this.disableInteractivity.bind(this);this.toggleInteractivity=this.toggleInteractivity.bind(this);this.trigger.addEventListener("click",this.openBottomSheet)}
async openBottomSheet(){const getbottomSheetContent=()=>{this.bottomSheetContent=createElement("content");this.bottomSheetContent.setAttribute("body-scroll-lock-ignore",!0)};const getClonedBottomSheet=()=>{this.clonedBottomSheet=this.bottomSheet.cloneNode(!0);this.clonedBottomSheet.classList.add("bottom-sheet");this.newBottomSheetContent=wrapAll(this.clonedBottomSheet,this.bottomSheetContent,);this.clonedBottomSheet.appendChild(this.newBottomSheetContent);this.newBottomSheetContent.addEventListener("keydown",e=>{trapFocus(this.newBottomSheetContent,e)});focusOnFirstElement(this.newBottomSheetContent);if(this.options.overlay)
this.clonedBottomSheet.classList.add("interactive")};const getSwipeableBottomSheet=()=>{this.swipeableBottomSheet=document.createElement("div");this.swipeableBottomSheet.appendChild(this.clonedBottomSheet);if(this.options.overlay)
this.swipeableBottomSheet.appendChild(this.overlay)};const mq=window.matchMedia("(min-width: 769px)");if(mq.matches===!1){if($id(this.options.bottomSheetId))return;if(openedInstances.length>0){openedInstances.forEach(instance=>{instance.bottomSheetDismissed=!0;document.removeEventListener("touchstart",instance.toggleInteractivity,);closeBottomSheet(instance.swipeableBottomSheet)})}
this.bottomSheetDismissed=!1;if(this.options.overlay){this.overlay=createElement("overlay");this.overlay.classList.add("hidden")}
this.bottomSheetPeek=createElement("peek");this.bottomSheetMargin=createElement("margin");this.bottomSheetPeek.style.top=this.options.peek;getbottomSheetContent();getClonedBottomSheet();this.clonedBottomSheet.classList.add("disable-scrollbars");this.clonedBottomSheet.insertBefore(this.bottomSheetPeek,this.clonedBottomSheet.firstChild,);this.clonedBottomSheet.insertBefore(this.bottomSheetMargin,this.clonedBottomSheet.firstChild,);this.clonedBottomSheet.addEventListener("scroll",this.onScroll,passiveIsSupported?{passive:!0}:!1,);getSwipeableBottomSheet();ID_COUNTER+=1;this.swipeableBottomSheet.dataset.bottomSheetId=ID_COUNTER;document.body.appendChild(this.swipeableBottomSheet);const peekTop=this.options.peekNumber;this.clonedBottomSheet.classList.add("hidden");this.clonedBottomSheet.scrollTop=peekTop;this.closeThreshold=peekTop*0.5;if(this.options.closeThreshold&&this.options.closeThreshold<peekTop){this.closeThreshold=this.options.closeThreshold}
openedInstances=[...openedInstances,this];if(this.options.onOpen)
this.options.onOpen(this.bottomSheetContent,(slide=!0)=>closeBottomSheet(this.swipeableBottomSheet,slide),);if(this.options.overlay){bodyScrollLock.disableBodyScroll(this.clonedBottomSheet);await Promise.allSettled([enter(this.clonedBottomSheet,"slidein"),enter(this.overlay,"fade"),]);const handleMarginClick=()=>closeBottomSheet(this.swipeableBottomSheet);this.bottomSheetMargin.addEventListener("click",handleMarginClick,{once:!0,})}else{await enter(this.clonedBottomSheet,"slidein");this.swipeableBottomSheet.setAttribute("id",`swipeable-bottom-sheet-no-overlay`,);document.addEventListener("touchstart",this.toggleInteractivity,passiveIsSupported?{passive:!0}:!1,)}}else{this.options.overlay=!0;if(this.options.overlay)this.overlay=createElement("overlay");getbottomSheetContent();getClonedBottomSheet();getSwipeableBottomSheet();document.body.appendChild(this.swipeableBottomSheet);await enter(this.overlay,"fade");bodyScrollLock.disableBodyScroll(this.clonedBottomSheet);const handleMarginClick=event=>{if(!this.newBottomSheetContent.contains(event.target)){closeBottomSheet(this.swipeableBottomSheet,!1)}};this.clonedBottomSheet.addEventListener("click",handleMarginClick,{once:!0,})}}
onScroll(){if(!this.bottomSheetDismissed&&this.clonedBottomSheet.scrollTop<this.closeThreshold){this.bottomSheetDismissed=!0;closeBottomSheet(this.swipeableBottomSheet)}}
enableInteractivity(){if(!this.isInteractive){this.isInteractive=!0;this.clonedBottomSheet.classList.add("interactive");bodyScrollLock.disableBodyScroll(this.clonedBottomSheet)}}
disableInteractivity(){if(this.isInteractive){this.isInteractive=!1;this.clonedBottomSheet.classList.remove("interactive");bodyScrollLock.enableBodyScroll(this.clonedBottomSheet)}}
toggleInteractivity(e){const{y}=getCurrentCursorPosition(e);if(y>this.clonedBottomSheet.clientHeight+this.clonedBottomSheet.offsetTop-this.clonedBottomSheet.scrollTop){this.enableInteractivity()}else{this.disableInteractivity()}}}
async function closeBottomSheet(bottomSheetToClose,slide=!0){const bottomSheet=bottomSheetToClose.querySelector(".bottom-sheet");const overlay=bottomSheetToClose.querySelector(".overlay");if(slide){await Promise.allSettled([leave(bottomSheet,"slidein"),leave(overlay,"fade"),])}else{await leave(bottomSheet,"slidein")}
openedInstances=openedInstances.filter(instance=>bottomSheetToClose!==instance.swipeableBottomSheet,);document.body.removeChild(bottomSheetToClose);bodyScrollLock.enableBodyScroll(bottomSheet)}