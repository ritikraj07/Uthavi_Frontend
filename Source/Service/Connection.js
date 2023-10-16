 const PostData = async (url, data) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            return await response.json();
        } catch (error) {
            console.error(error, "eeeeee");
        }
    };


export default PostData;
 



const GetData = async (url) => {
    console.log(url)
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error(error, "eeeeee");
    }
};

export {GetData}