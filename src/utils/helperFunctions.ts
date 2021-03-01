import bcrypt from "bcrypt"
import {Errors} from "./errorsUtils"


export class HelperFunctions{

    generateRandomPassword(): string{
        const str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let password = '';
        while(password.length < 12){
          let tempChar = Math.floor(Math.random()*str.length);
          password += str[tempChar];
        }
        return password;
    }

    async hashPassword(password){
        try{
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            if(hashedPassword) return hashedPassword;
            throw new Error(Errors.INTERNAL_ERROR);
        } catch(e){
            console.log(e.message);
            return {error: e.message};
        }
    }

    async comparePassword(password, hashedPassword){
        try{
            const result = await bcrypt.compare(password, hashedPassword);
            console.log(result);
            if(result) return true;
            else return false;
        } catch(e){
            console.log(e.message);
            return {error: Errors.INTERNAL_ERROR}
        }
    }

    capitalizeString(item: string | string[]){
        if(typeof item === "string"){
          return item[0].toUpperCase + item.substring(1);
        }
        return item.map(i => i[0].toUpperCase() + i.substring(1));
     }

    convertArrayToSet(arr){
        let set = new Set();
        for(let i of arr){
          set.add(i);
        }
        return set;
    }

    generateId(): string {
        const str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@";
        let id = '';
        while(id.length < 10){
          let tempChar = Math.floor(Math.random()*str.length);
          id += str[tempChar];
        }
        return id;
    }

    convertStringToDate(date: string){
        let month_date = {1:31, 2: 28 | 29, 3:31, 4:30, 5:31, 6:30, 7:31, 8:31, 9:30, 10:31, 11:30, 12:31};
        let arr = date.split('-');
        if(arr.length !== 3) return null;
        if(!(arr[0].length === 4 && parseInt(arr[0]) )) return null;
        if(!(arr[1].length === 2 && parseInt(arr[1]) && (parseInt(arr[1]) < 13) )) return null;
        if(!(arr[2].length === 2 && parseInt(arr[2]) )) return null;
        if(!(  month_date[parseInt(arr[1])] === parseInt(arr[2]) )) return null;

        return new Date(parseInt(arr[0]),parseInt(arr[1]),parseInt(arr[2]));
  }
}
