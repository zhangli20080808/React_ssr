import axios from 'axios'
export const getHomeList = () => {
    return () => {
        axios.get('http://47.95.113.63/ssr/api/news.json?secret=abcd')
            .then((res) => {
                console.log(res);
            })
    }

}