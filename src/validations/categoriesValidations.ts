
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

    //ok
    static validateCreate(category: Category){
        const { title, color } = category;

        const onlySpacesTitle = title.trim().length === 0;


        if(!title || !color){
            throw new Error('please do not leave any empty field');
        }

        if(color.indexOf('#') != 0){
            throw new Error('please make sure the color code is preceded by \'#\'');
        }

        const isHexColor = this.isHexColor(color);

        if(!isHexColor){
            throw new Error('invalid color code!');
        }

        if(onlySpacesTitle){
            throw new Error('please input a valid title');
        }


        if(title.length > 20){
            throw new Error('limit of characters for title field is 20');

        }
    }

    //ok
    static validateFilter(id: string){

        if(!this.validateId(id)){
            throw new Error("Id parameter must be a number");
        }

        if(!id){
            throw new Error('please provide a category id');
        }
    }

    //ok
    static validateDelete(id: string){
        if(!this.validateId(id)){
            throw new Error("Id parameter must be a number");
        }

        if(!id){
            throw new Error('please provide a category id');
        }
    }

    static validateUpdate(category: Category){
        const { title, color, id } = category;

        if(!this.validateId(id)){
            throw new Error("Id parameter must be a number");
        }

        if(color){
            if(color.indexOf('#') != 0){
                throw new Error('please make sure the color code is preceded by \'#\'');
            }
            const isHexColor = this.isHexColor(color);
            if(!isHexColor){
                throw new Error('invalid color code!');
            }
        }

        if(title){
            const onlySpacesTitle = title.trim().length === 0;
            if(onlySpacesTitle){
                throw new Error('please input a valid title');
            }

            if(title.length > 20){
                throw new Error('limit of characters for title field is 20');
            }
        }

    }
}

export default Validations;