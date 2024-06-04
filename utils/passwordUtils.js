const generateRandomPassword = (length = 7) => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$&#';
  const symbols = '@$&#';
  
  let password = '';
  let hasSymbol = false;
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    const randomChar = chars[randomIndex];
    
    if (symbols.includes(randomChar)) {
      hasSymbol = true;
    }
    
    password += randomChar;
  }
  
  if (!hasSymbol) {
    const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
    const replaceIndex = Math.floor(Math.random() * length);
    password = password.substring(0, replaceIndex) + randomSymbol + password.substring(replaceIndex + 1);
  }
  
  return password;
};

export default generateRandomPassword;
