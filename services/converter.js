
const omitSingle = (key, { [key]: _, ...obj }) => obj;


const categoryFunctional = async(data)=> {

    let response = [];
    for(let i in data){
        const result = omitSingle('category_id', data[i]._doc);
        response.push({...result,category:data[i].category_id});
    }
    return response;

};



const functionalByCategory = async(data)=> {

    let response = [];
    for(let i in data){
        const result = omitSingle('category_id', data[i]._doc);
        response.push({...result,category:data[i].category_id});
    }
    return response;

};

const functionalResults = async(data)=> {

    let response = [];
    let res = data.content[0].options;

    let totalVotes = 0;
    for(let i in res){
        totalVotes = totalVotes + res[i].total_votes;
    }
    for(let i in res){
        let percent = (res[i].total_votes / totalVotes)*100;
        response.push({...data.content[0].options[i]._doc,percent:(percent) ? Math.round(percent) : 0});
    }

    return {data:response};

};

const randomResponseImageSetting = async (data) => {
    let response = [];

    if (Object.keys(data).length > 0) {
        for (let i in data) {

            let imageFacebook = '';

            if(data[i].content[0].multimedia_question.image.path === ''){

                if (data[i].sharing.length > 0) {

                    const sharing = data[i].sharing.filter(
                        (value) => value.social === 'facebook'
                    );

                    if (sharing.length > 0) {
                        const sharingData = sharing[0];
                        imageFacebook = sharingData.image;
                    }

                }
            }


            response.push({
                ...data[i]._doc,
                imageAlternativeNextFunctional: imageFacebook,
            });
        }
    }

    return response;
};

module.exports = {
    categoryFunctional,
    functionalByCategory,
    functionalResults,
    randomResponseImageSetting
};