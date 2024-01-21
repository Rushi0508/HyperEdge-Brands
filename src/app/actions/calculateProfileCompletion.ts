export const calculateProfileCompletion = (user:any) => {
    let completed = 0;
    let total = 11
    // Brand Data
    for(let key in user){
      if(key=='email' || key=="website" || key=="industry" || key=="name" || key=='phoneNumber' || key=="personRole" || key=='personName' ||  key=='description' || key=='country' || key=='state' || key=='city'){
        if(Array.isArray(user[key]) && user[key].length!==0){
          completed++;
        }
        else if(user[key]!==null && user[key]!==undefined && user[key]!==''){
          completed++;
        }
      }
    }
    const percentage = completed/total * 100;
    return Math.round(percentage)
  };