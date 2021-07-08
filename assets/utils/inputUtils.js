export const autoFillDash = (str) => {
  const nums = str.replace(/[^0-9]/g, '');
  let phone = '';
  if(nums.length <= 3){
    return nums;
  }else if(nums.length < 7){
    phone += nums.slice(0, 3); // 010
    phone += "-";
    phone += nums.slice(3); // 010-345
    return phone
  }else if(nums.length < 11){
    phone += nums.slice(0, 3); // 010
    phone += "-";
    phone += nums.slice(3, 6); // 010-345
    phone += "-";
    phone += nums.slice(6); // 010-345-6789
    return phone;
  }else{
    phone += nums.slice(0, 3); // 010
    phone += "-";
    phone += nums.slice(3, 7); // 010-3456
    phone += "-";
    phone += nums.slice(7, 11); // 010-3456-7890
    return phone;
  }
}