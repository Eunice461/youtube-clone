//this function below handle omiting of some necessary models like avoiding password or email to be send to the client part

//the T is the object and the property id the keyword of the object. for example:
//{username: dara}. the object is username while the keyword is dara

function omit<T>(obj: T, property: keyof T | (keyof T)[]) {
    //the if statement is checking if what we want to omit is an arrays of keys
    if (Array.isArray(property)) {
        //object.entries convert objects to arrays
      const entries = Object.entries(obj).filter((item) => {
        //filter the array to return only the keyword
        const [key] = item;

        //here is returning 
        return !property.includes(key as keyof T);
      });
  
      return Object.fromEntries(entries);
    }
  
    //here is checking if the key is just a single key then omiting it 
    const { [property]: unused, ...rest } = obj;
  
    return rest;
  }
  
  export default omit;