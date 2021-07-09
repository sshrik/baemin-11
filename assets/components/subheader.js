import * as $ from "../utils/$";

export function addEventSubHeaderLeftBtn({ event, listener }){
  const subHeader = $.qs(".sub-header");
  const headerLeft = $.qs(".header__left", subHeader);
  const aTag = $.qs("a", headerLeft);
  aTag.addEventListener(event, listener);
}
