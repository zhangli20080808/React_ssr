
import { CHANGE_LIST_Translation } from './constants';

const changeList = (list) => ({
	type: CHANGE_LIST_Translation,
	list
})

export const getTranslationList = () => {

return (dispatch, getState, axiosInstance) => {
    return axiosInstance.get('/api/translations.json')
        .then((res) => {
            if(res.data.success){
                const list = res.data.data
                dispatch(changeList(list))
            }else{
                const list = []
                dispatch(changeList(list)) 
            }
        })
}
} 