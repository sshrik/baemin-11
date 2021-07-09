const REGEX = {
  EMAIL: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  PHONE: /^(?:(010-\d{4})|(01[1|6|7|8|9]-\d{3,4}))-(\d{4})$/,
}

export const email = (str) => REGEX.EMAIL.test(str);
export const loginPassword = str => Boolean(str);
export const phone = str => REGEX.PHONE.test(str);
export const nickname = str => Boolean(str);
export const birth = str => {
  if(!str) return false;
  if(str.length !== 10) return false;
  const date = new Date(str.replace(".", "-"));
  if(date.toString() === "Invalid Date") return false;
  return true;
}

export function password(password){
  if(password.length < 10) return false;
  const nums = [...password.replace(/[^0-9]/g, "")].map(e => +e);
  const len = nums.length;
  for(let i=0 ; i<len ; i++){
    if(nums[i] && nums[i+1] && nums[i+2]){
      if(nums[i] === nums[i+1] && nums[i] === nums[i+2]) return false;
    }
  }

  for(let i=0 ; i<len ; i++){
    if(nums[i] && nums[i+1] && nums[i+2]){
      if(nums[i] + 1 === nums[i+1] && nums[i] + 2 === nums[i+2]) return false;
    }
  }

  for(let i=0 ; i<len ; i++){
    if(nums[i] && nums[i+1] && nums[i+2]){
      if(nums[i] >= 2){
        if(nums[i] - 1 === nums[i+1] && nums[i] - 2 === nums[i+2]) return true;
      }
    }
  }

  let count = 0;
  if(/[0-9]+/.test(password)) count++;
  if(/[a-z]+/.test(password)) count++;
  if(/[A-Z]+/.test(password)) count++;
  if(/[\!\@\#\$\%\^\&\*\(\)\_\[\]\{\}\;\:\'\"\,\<\.\>\/\?']/.test(password)) count++;

  if(count < 2) return false;
  return true;
}