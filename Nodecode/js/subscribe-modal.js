jQuery(function($){const subscribeModal=document.getElementById('subscribe-modal');const successModal=document.getElementById('success-modal');const subscribeButton=document.getElementById('subscribe-button');const subscribeButtonMobile=document.getElementById('subscribe-button--mobile');const mobileBottomStickyWidget=document.getElementsByClassName('mobile-bottom-sticky-widget')[0];const subscribeModalClose=document.getElementById('subscribe-modal-close');const subscriptionForms=document.getElementsByClassName('subscriber-email-form');const successModalClose=document.getElementById('sub-success-close');const subscribeFormButton=document.getElementsByClassName('newsletter-form-submit');if(!subscribeModal||!successModal||!subscriptionForms.length){return}
function modifyClass(modal,className,operation='add'){if('add'===operation){modal.classList.add(className)}else if('remove'===operation){modal.classList.remove(className)}else if('toggle'===operation){modal.classList.toggle(className)}}
function validateEmail(email){const emailRegex=/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;if(email.match(emailRegex)){return!0}
return!1}
function createCookie(name,value,days){var expires;if(days){var date=new Date();date.setTime(date.getTime()+(days*24*60*60*1000));expires='; expires='+date.toGMTString()}else{expires=''}
document.cookie=encodeURIComponent(name)+'='+encodeURIComponent(value)+expires+'; path=/'}
function readCookie(name){var cookieName=encodeURIComponent(name)+'=';var cookieArray=document.cookie.split(';');for(var index=0;index<cookieArray.length;index++){var currentCookie=cookieArray[index];while(currentCookie.charAt(0)===' ')
currentCookie=currentCookie.substring(1,currentCookie.length);if(currentCookie.indexOf(cookieName)===0)
return decodeURIComponent(currentCookie.substring(cookieName.length,currentCookie.length))}
return null}
function eraseCookie(name){createCookie(name,'',-1)}
if(subscribeButton){subscribeButton.addEventListener("click",function(){$(subscribeModal).toggle(300)})}
if(subscribeFormButton){Array.from(subscribeFormButton).forEach(function(button){button.addEventListener("click",function(){$(subscribeModal).toggle(300)})})}
if(subscribeButtonMobile){subscribeButtonMobile.addEventListener("click",function(){$(subscribeModal).toggle(300)})}
if(subscribeModalClose){subscribeModalClose.addEventListener("click",function(){$(subscribeModal).toggle(300)})}
if(successModalClose){successModalClose.addEventListener("click",function(){$(successModal).toggle(300)})}
$(document).click(function(e){if($(e.target).is('.subscribe-modal-layout')){$(subscribeModal).toggle(300)}
if($(e.target).is('.sub-success-layout')){$(successModal).toggle(300)}});if(readCookie('scripbox_subscriber_email')){modifyClass(subscribeButton,'hidden','add');modifyClass(mobileBottomStickyWidget,'sm:hidden','add')}
Array.from(subscriptionForms).forEach(subscriptionForm=>{subscriptionForm.addEventListener('submit',async(event)=>{var formSource=subscriptionForm.getAttribute('data-source');const invalidEmailWarning=subscriptionForm.getElementsByClassName('sub-modal-invalid')[0];const dotFlashingLoader=subscriptionForm.getElementsByClassName('dot-flashing--subscribe')[0];if(!invalidEmailWarning||!dotFlashingLoader){return}
event.preventDefault();$(dotFlashingLoader).show();let userEmail=subscriptionForm.elements['subscribe-modal__input-email'].value;if(!validateEmail(userEmail)){$(invalidEmailWarning).show();$(dotFlashingLoader).hide();subscriptionForm.reset();return}
var cookieEmail=readCookie('scripbox_subscriber_email');if(cookieEmail===null||cookieEmail!==userEmail){eraseCookie('scripbox_subscriber_email');let postData={'email':userEmail,'source':'subscription'};if(formSource==='footer'){postData.source='Footer Subscription'}
await fetch(subscribeModalExports?.SCRIPBOX_SUBSCRIBERS_LIST_API,{method:'POST',crossDomain:!0,headers:{'Content-Type':'application/json',},body:JSON.stringify(postData),}).then(data=>{createCookie('scripbox_subscriber_email',userEmail,30);modifyClass(subscribeButton,'hidden','add');modifyClass(mobileBottomStickyWidget,'sm:hidden','add');if('header'===formSource){$(subscribeModal).hide(300)}else if('footer'===formSource){subscriptionForm.elements['subscribe-modal__button-submit'].innerText='Subscribed!'}
if(readCookie('scripbox_subscriber_email')!==null){if('header'===formSource){$(successModal).show(300)}}
$(dotFlashingLoader).hide();$(invalidEmailWarning).hide()}).catch((error)=>{if('header'===formSource){$(subscribeModal).hide(300)}
$(dotFlashingLoader).hide();$(invalidEmailWarning).hide()})}else if(cookieEmail===userEmail){modifyClass(subscribeButton,'hidden','add');modifyClass(mobileBottomStickyWidget,'sm:hidden','add')}
subscriptionForm.reset()})})})