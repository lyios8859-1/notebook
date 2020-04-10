import { DESKTOP, MYPAGE, MANAGER, SETTING, FEEDBACK, ABOUT } from '../utils/static-variable';
function footHandle(mark) {
  switch (mark) {
    case DESKTOP:
      console.log(DESKTOP)
      break;
    case MYPAGE:
      break;
    case MANAGER:
      break;
    case SETTING:
      break;
    case FEEDBACK:
      break;
    case ABOUT:
      break;
    default:
      console.log('无');
      break;
  }
}

export default function (mark) {
  footHandle(mark);
}