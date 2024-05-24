/*! For license information please see playerInterface.js.LICENSE.txt */
Math.trunc||(Math.trunc=function(t){return t<0?Math.ceil(t):Math.floor(t)}),define(["scormdata","app/events","app/player/dataHandler","app/utilities/XyTools","lang/lang","notification","usp"],(function(t,e,n,i,r,o,s){const a={messages:{confirmationMessage:r.t("components.exitButton.confirm")||"Are you sure you want to exit the course? Your progress will be saved.",submitAllMessage:r.t("components.submitAllButton.confirm")||"Do you really want to submit all your answers?",acceptanceCheckMessage:r.t("components.submitAllButton.acceptanceCheck")||"I understand that any unanswered questions will also be submitted"}},u="Resume",c="Retake",l="Review";s=s.default,"object"==typeof global&&null!==global&&(s=global.player);let f=null,g=[],d=[],m=!1;function p(){return/^true$/i.test(window.Xyleme.environment.IS_DEPLOY)}function h(){const t={};if(!m)return{};const e=s.getRootActivity();return e&&function e(n){const i=P(n,"availableChildren")||[];t[n.id]=JSON.stringify(i);for(let t=0,n=i.length;t<n;t++){const n=S(i[t]);n&&e(n)}}(e),t}function b(){return{completionStatus:s.isCourseCompleted(),bookmark:L(),score:H.getRootActivity("score"),successStatus:H.getRootActivity("satisfied"),suspendData:s.getSuspendData()}}function v(){w()&&e.trigger("communication.saveQuestionsToPlayer");const t=b();t&&t.suspendData&&n.saveSuspendData(t)}function y(t){if(m){const e=s.getCurrentActivity();return t?P(e,t):e}return null}function C(t,e){return m?(e||(e=t),P(s.getParentActivity(t),e)):null}function A(t,e,n){if(m){if("guid"===t){const i=s.getActivityBy(t,e);return n?P(i,n):null}if("id"===t){const t=S(e);return n?P(t,n):null}return null}return null}function P(t,e){return t&&e&&"string"==typeof e?e.match(/name|title/i)?t.title:e.match(/^guid$/i)?t.guid:e.match(/^attempts$/i)?t.attempts:e.match(/^score$/i)?t.normalizedMeasure?(100*t.normalizedMeasure).toFixed(2):"0.00":e.match(/^passingscore$/i)?100*t.minimumMeasure:e.match(/^weight$/i)?100*+t.weight:e.match(/^completion$/i)?!0===t.completion:e.match(/^satisfied$/i)?!0===t.satisfied:e.match(/^parent$/i)?t.parent:e.match(/^availableChildren$/i)?t.availableChildren:e.match(/^leaf$/i)?0===t.availableChildren.length:void 0!==t[e]?t[e]:t:null}function S(t){return m?s.getActivityById(t):null}function k(){const t=[];if(!m)return[];const e=s.getRootActivity();return e&&function e(n){const i=P(n,"availableChildren")||[];t.push(n.id);for(let t=0,n=i.length;t<n;t++){const n=S(i[t]);n&&e(n)}}(e),t}function w(){return!!m&&s.hasQuestions()}function D(t){if(P(t,"leaf"))return s.hasQuestions(P(t,"id"));{const e=P(t,"availableChildren");for(let t=0;t<e.length;t++){const n=S(e[t]);if(n&&D(n))return!0}}return!1}function I(t,e){if(!m)return null;if(!e&&!function(t){const e=S(t);let n=null;if(!P(e,"leaf")){const i=P(e,"children")||[];for(let e=0;e<i.length;e++)if(n=_(i[e]),n&&S(n).parent===t)return!0}return!1}(t))return null;const n=S(t);let i=n;const r=S(P(n,"parent"));r&&e&&1===P(r,"children").filter((function(t){const e=S(t);return e&&!P(e,"leaf")}),this).length&&(i=r);const o=P(n,"availableChildren")||[],a={title:P(i,"title"),score:P(n,"score"),passingScore:P(n,"passingscore"),weight:P(n,"weight"),attempts:P(n,"attempts"),pages:[],containers:[]};if(o.forEach((function(t){const e=S(t);D(e)&&(P(e,"leaf")?a.pages.push(function(t){const e=P(t,"id"),n=s.getObjectives(e),i=s.getInteractions(e),r={title:P(t,"title"),id:e,guid:P(t,"guid"),link:P(t,"href"),questions:[]};return n.filter((function(t){return/^q-/.test(t.id)})).forEach((function(e,n){const o=i[n];let s,a,u,c,l;const f=o?o.result:"";if(o&&o.response?(a="Attempted",s=o.response):(a=P(t,"attemptProgressStatus")?"Skipped":"Not Attempted",s=""),o&&o.description)try{const t=JSON.parse(o.description);u=!!t.f,c=t.a,l=t.o}catch(t){return}else u=!1;const g={result:f,response:s,status:a,flag:u,guid:(e.id||"").replace("q-","")};l&&(g.order=l),c=void 0,c&&(g.remainingAttempts=c),r.questions.push(g)})),r}(e)):a.containers.push(I(P(e,"id"),!0)))}),this),!e){const t=function(e,n){e.attempts=n,e.containers.forEach((function(e){t(e,n)}))};t(a,a.attempts)}return a}function O(){!function(){let t=s.getNextPage();for(;!E(t);)s.next(),t=s.getNextPage();s.next()}(),H.urlChanged()}function x(t){let e;return!!m&&(e=s.getObjectives(t),e.some((function(t){return/^SubmitAll$/.test(t.id)})))}function M(t){return function(t){return!!m&&s.isAssessmentSubmitted(t)}(t)}function N(t){let e;if(m&&(e=s.getObjectives(t).filter((function(t){return/^Submit/.test(t.id)})),e.length&&e[0].hasGlobalObjectives))return e[0].globalObjectiveId}function j(t){const e=y("id");if(t){let n;const i=s.findCommonAncestorId(t,e);i&&(n=N(i));const r=N(e);if(r&&r===n)return!0;const o=N(t);return!!o&&o===r}return B(e)}function B(t){let e;return!!m&&(e=s.getObjectives(t),e.some((function(t){return/^Submit/.test(t.id)})))}function _(t){const e=t||y("id"),n=N(e);if(m&&n){let t,i,r=S(e);for(;!i&&r&&r.parent;)r=S(r.parent),t=P(r,"availableChildren")||[],t.forEach((function(t){const e=S(t);if(e&&P(e,"leaf")&&E(t)){const e=N(t);n===e&&(i=t)}}));return i}}function E(t){return s.isScorecard(t)}function $(t){const e={};if(!m)return e;const n=I(t||C("id")),i=function(t){t&&t.pages.forEach((function(t){t.questions.forEach((function(t){e[t.guid]=t.status}))})),t.containers.forEach(i,this)};return i(n),e}function Q(){let t,e=!0;const n=$(C(_(),"id"));for(t in n)if(Object.prototype.hasOwnProperty.call(n,t)){const i=n[t];"Not Attempted"!==i&&"Skipped"!==i||(e=!1)}return!e}function R(){const t=$(C(_(),"id"));let e;for(e in t)if(Object.prototype.hasOwnProperty.call(t,e)){const n=t[e];if(n&&"Not Attempted"!==n)return!0}return w()}function T(t,e){e?d=t:g=t}function q(){return e.trigger("communication.saveQuestionData"),s.isCourseCompleted()}function z(){return F(!1)}function F(t){if(m){const e=s.getObjectives();for(let n=1;n<e.length;n++){const i=e[n].id;if(i.startsWith(c))return t&&J(i)?l:c;if(i.startsWith(l))return l}}return u}function J(t){let e=!1;const n=parseInt(t.match(/^.*-(.*)/)[1]);return attemptsCount=C(_(),"attempts"),!isNaN(n)&&n<attemptsCount&&(e=!0),e}function L(){let t;const e=z();return t=e===c||e===l?_()+"_type_"+e:H.getCurrentActivity("id")+"_type_"+u,t}const H={cache:{},isCDSDeploy:p,getCustomParameters:function(){console.log("TODO implement getCustomParameters")},initialize:function(){if(null==s)throw"Player not found";"object"==typeof global&&null!==global&&(t=(new DOMParser).parseFromString(global.scormdata,"application/xml"));let i="function"==typeof n.getBookmark?n.getBookmark():n.bookmark;i=i||"";const r=s.retrieveBookmark(i||""),o=r.bookmark?r.bookmark:i,a=r.bookmarkType?r.bookmarkType:u,f="function"==typeof n.getSuspendData?n.getSuspendData():n.suspendData,g=s.start({manifest:t,suspendData:f,bookmark:o});return g&&(m=!0,o&&function(t){if(t===c||t===l){const e=y();if(!_((e?e.parent:void 0)||void 0))return;t=F(!0),O()}t===c&&s.retake()}(a),H.triggerPlayerStart(),e.on("navigation.completePageLoad:after",v),H.urlChanged()),g},next:function(){let t;return m&&(f=h(),t=s.next()),t&&H.urlChanged(),t},previous:function(){let t;return m&&(f=h(),t=s.previous()),t&&H.urlChanged(),t},choose:function(t){let e;return m&&(f=h(),e=s.choice(t)),e&&H.urlChanged(),e},retake:function(t){let e;return m&&(f=h(),e=s.retake(t)),e&&H.urlChanged(),e},unload:function(){let t;return m&&(t=s.exit(),H.triggerPlayerUnload(),g=[],d=[],f=null,m=!1),t},getRootActivity:function(t){if(m){const e=s.getRootActivity();return t?P(e,t):e}return null},getCurrentActivity:y,getParentActivity:C,getActivityBy:A,hasQuestions:w,getInteractionsData:function(t){const e=A("guid",t,"id");return s.getInteractions(e)},processScorecardContainer:function(t){return e.trigger("communication.saveQuestionsToPlayer"),I(t)},exitContainer:O,isSubmitAllMode:x,saveSubmitAllStatus:function(t){m&&s.submitAssessment(t)},isSubmitAllStatusSaved:M,isAssessment:j,isAnyAssessment:B,hasSubassessments:function(t){return!!m&&s.getObjectives(t).some((function(t){return(/^so-/.test(t.id)||/^sa-/.test(t.id))&&t.hasGlobalObjectives}))},getCurrentTime:function(){return Date.now()},findScorecard:_,isScorecard:E,getSectionStatusData:$,hasUnansweredQuestions:Q,hasAttemptedQuestions:R,getMenuItems:function(t){return m&&((t?d.length:g.length)||(g=s.getMenuItems(),d=s.getMenuItems(t))),t?d.slice():g.slice()},getPageIndexInCourse:function(t){if(!m)return 0;let e=0,n=t;if(t||(n=y("id")),n){const t=k();if(-1===t.indexOf(n))return 1;for(let i=0;i<t.length;i++){const r=t[i],o=S(r);if(o&&P(o,"leaf")&&(e++,r===n))break}}return 0!==e?e:1},getCurrentPageNumberInContainer:function(){const t=y("id"),e=C("availableChildren")||[];for(let n=0,i=e.length;n<i;n++)if(e[n]===t)return n+1;return 0},getContainerPagesCount:function(){return(C("availableChildren")||[]).length},getCoursePagesCount:function(){return k().length},isSibling:function(t){const e=y(),n=P(e,"parent");return!!e&&("string"!=typeof t||null!=(t=S(t)))&&n===P(t,"parent")},wasRandomizationApplied:function(t){if(null===f)return!0;t||(t=y("id"));const e=f[t];if(!t||!e)return!1;const n=P(S(t),"availableChildren")||[];return e!==JSON.stringify(n)},comesAfterCurrent:function(t){const e=y("id");if(!t||!e)return null;if(t===e)return!1;const n=k();return n.indexOf(t)>n.indexOf(e)},checkPageExistence:function(t){return!!m&&!!S(t)},getPrecedingLinkedPagesCount:function(t){const e=y("id");if(!e)return 0;const n=s.getAllActivitiesList();let i=0,r=!1;return n.forEach((function(n){r||(n.id!==e?n.href&&n.href.indexOf(t)>=0&&(i+=1):r=!0)})),t!==y("guid")&&(i-=1),i},getExitMessage:function(t){const e=!1===t?x():j();if(!q()){if(!e||M()||!R())return a.messages.confirmationMessage;{const t=z();if(t===c||t===l)return a.messages.submitAllMessage;if(t===u)return a.messages.confirmationMessage}}},getExitConfirmation:function(t,n){const i=z(),r=!1===n?x():j(),s='<div class="SubmitAllConfirmationDialog"><p><b>'+a.messages.submitAllMessage+'</b></p><label><input type="checkbox" /> '+a.messages.acceptanceCheckMessage+"</label></div>";q()?"function"==typeof t&&t():!r||M()||i!==c&&i!==l||!R()?o.confirm(a.messages.confirmationMessage,t):o.confirm(s,t,{open:function(){const t=this.popup.find(".ConfirmOkButton"),n=this.content.find("input[type=checkbox]");e.trigger("communication.saveQuestionData"),Q()?n[0].disabled||(t.addClass("Disabled")[0].disabled=!0,n.on("change",(function(){this.checked&&(this.disabled=!0),t.removeClass("Disabled")[0].disabled=!1}))):this.content.find("label").hide()}})},getNextPage:function(){return m?s.getNextPage():null},getPreviousPage:function(){return m?s.getPreviousPage():null},getFollowingPageId:function(){return m?s.getFollowingPageId():null},getPrecedingPageId:function(){return m?s.getPrecedingPageId():null},getBookmarkType:z,storeAdditionalData:function(t){s.storeAdditionalData(t)},retrieveAdditionalData:function(t){if(!p())return;let e=s.retrieveAdditionalData();return t?(e=e||"{}",e=JSON.parse(e),e[t]):e},urlChanged:function(){const t=s.getCurrentActivity();if(!t)return void console.log("Tried to change url, but current activity was not detected");s.isCourseCompleted();const n=s.getFollowingPageId(),i=!!n&&s.isScorecard(n),r={origin:"ScormPlayer",next:{visible:!s.isButtonHidden("continue"),enabled:i||s.isNavigationValid("continue").validity},previous:{visible:!s.isButtonHidden("previous"),enabled:s.isNavigationValid("previous").validity}};T(s.getMenuItems(!0),!0),T(s.getMenuItems()),H.updateControls(r),e.trigger("content.url:changed",!1,t.href||"",t.id)},updateControls:function(t){e.trigger("navigationButtons.state:changed",!0,t)},triggerPlayerStart:function(){e.trigger("player.start",!0,this)},triggerPlayerUnload:function(){e.trigger("communication.saveQuestionData");const t=b();e.trigger("player.unload:after"),n.saveData(t)},isProctored:function(){return!1},getInitialized:"object"==typeof global&&null!==global?function(){return m}:void 0,API_1484_11:s.API_1484_11};return window.PlayerInterface=H,window.API_1484_11=s.API_1484_11,H}));