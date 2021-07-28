
interface Category {
    id: string,
    title: string,
    color: string
}

class Validations {

    static validateId(id: string){
        const idArray = id.split('');

        const filtered = idArray.filter((element) => isNaN(parseInt(element)));

        const newString = filtered.toString().replace(/,/g, '');

        return newString.length===0?true:false;
    }

    static isHexColor(color: string){
        const formattedColor = color.trim().slice(1);

        if(formattedColor.length !== 6 || isNaN(Number('0x' + formattedColor)))
            return false;
        
        return true;
    }

    static validateCreate(category: Category){
        const { title, color } = category;

        const onlySpacesTitle = title.trim().length === 0;


        if(!title || !color){
            return {message: 'please do not leave any empty field'};
        }

        if(color.indexOf('#') != 0){
            return {message: 'please make sure the color code is preceded by \'#\''};
        }

        const isHexColor = this.isHexColor(color);

        if(!isHexColor){
            return {message: 'invalid color code!'};
        }

        if(onlySpacesTitle){
            return {message: 'please input a valid title'};
        }


        if(title.length > 20){
            return {message: 'limit of characters for title field is 20'};
        }

        return true;
    }

    static validateFilter(id: string){

        if(!this.validateId(id)){
            return {message: "Id parameter must be a number"};
        }

        if(!id){
            return {message: 'please provide a category id'};
        } else {
            return true;
        }
    }

    static validateDelete(id: string){
        if(!this.validateId(id)){
            return {message: "Id parameter must be a number"};
        }

        if(!id){
            return {message: 'please provide a category id'};
        } else {
            return true;
        }
    }

    static validateUpdate(category: Category){
        const { title, color, id } = category;

        if(!this.validateId(id)){
            return {message: "Id parameter must be a number"};
        }

        if(color){
            const isHexColor = this.isHexColor(color);
            if(!isHexColor){
                return {message: 'invalid color code!'};
            }
        }

        if(title){
            const onlySpacesTitle = title.trim().length === 0;
            if(onlySpacesTitle){
                return {message: 'please input a valid title'};
            }

            if(title.length > 20){
                return {message: 'limit of characters for title field is 20'};
            }
        }


        return true;
    }
}

export default Validations;