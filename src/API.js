import { supabase } from "./lib/supabaseClient";

//todo 등록하기
export const onCreateTodo = async (uuid, date, newTodo, closeModal, setError) => {
    const {data, error} = await supabase
        .from('todolist')
        .insert([
            {
                id: uuid, 
                title: newTodo, 
                start_date: date,
                complete_state: 'N', 
            }
        ])
        .select()
        
    if(error) setError('onCreateTodo 데이터 삽입 중 에러 발생 !!! ');
    else {
        console.log('todo 저장 성공');
        console.log(data);
    }
    
    
    //모달 close
    closeModal();

    return data[0];
}

//todo 수정하기
export const onUpdateTodo = async (uuid, idx, todo, closeModal) => {
    const { data, error } = await supabase
        .from('todolist')
        .update({ title: todo })
        .eq('id', uuid)
        .eq('idx', idx)
        .select()

    if(error) console.log(error);
    else{
        console.log('todo 수정 성공');
        console.log(data);
    }

    closeModal();

    return data[0];
}

//todo 삭제하기
export const onDeleteTodo = async (uuid, idx) => {
    const { data, error } = await supabase
        .from('todolist')
        .delete()
        .eq('id', uuid)
        .eq('idx', idx)
        .select()

    if(error) console.log(error);
    else{
        console.log('todo 삭제 성공');
        console.log(data);
    }

}

//todo 완료체크하기
export const onChangeCheck = async (idx, chkState) => {
    
    const { data, error } = await supabase
        .from('todolist')
        .update({complete_state: chkState})
        .eq('idx', idx)
        .select()

    if(error) console.log(error);
    
    return data[0];
}