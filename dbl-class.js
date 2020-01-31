class doblesel {

    //recebe um Seletor CSS
    constructor(target_select){
       
        let label_btn_up = "<";
        let label_btn_donw = ">";
        let label_btn_add = ">";
        let label_btn_remove = "<";
        let label_btn_add_all = ">>";
        let label_btn_remove_all = "<<";
        let label_edit_filter = "Filtro";

        let $dbl_principal = document.querySelector(target_select);
        let $div_dbl = document.createElement('div');
        let $dbl_secundario = document.createElement('select');
        let $div_dbl_principal = document.createElement('div');
        let $div_dbl_secundario = document.createElement('div');
        let $div_btn = document.createElement('div');
        let $div_up_down = document.createElement('div');
        let $btn_add = document.createElement('button');
        let $btn_remove = document.createElement('button');
        let $btn_add_all = document.createElement('button');
        let $btn_remove_all = document.createElement('button');
        let $btn_move_cima = document.createElement('button');
        let $btn_move_baixo = document.createElement('button');

        let $edt_search = document.createElement('input');
        let $edt_search_sec = document.createElement('input');

        this.dbl_secundario = $dbl_secundario;
        this.dbl_principal = $dbl_principal;

        this._add_style_block($dbl_principal);

        $edt_search.type="search";
        $edt_search.placeholder=label_edit_filter;
        $edt_search.classList.add('search-principal');
        $edt_search.addEventListener("input", (e)=>{
            e.preventDefault();
            this._filter($dbl_principal, $edt_search.value);
        });

        $edt_search.addEventListener("keydown", (e)=>{
            
            if(e.which == 13){
                e.preventDefault();
            }
        });

        $edt_search_sec.type="search";
        $edt_search_sec.placeholder=label_edit_filter;
        $edt_search_sec.classList.add('search-secundario');
        $edt_search_sec.addEventListener("input", (e)=>{
            e.preventDefault();
            this._filter($dbl_secundario, $edt_search_sec.value);
        });

        $btn_add.innerText=label_btn_add;
        $btn_add.classList.add('btn-move');
        $btn_add.addEventListener("click", (e)=>{
            e.preventDefault();
            this._addSelectedValues($dbl_principal, $dbl_secundario,"true");
        });

        $btn_add_all.innerText=label_btn_add_all;
        $btn_add_all.classList.add('btn-move');
        $btn_add_all.addEventListener("click", (e)=>{
            e.preventDefault();
            this._add_all_values($dbl_principal, $dbl_secundario, "true")
        });

        $btn_remove_all.innerText=label_btn_remove_all;
        $btn_remove_all.classList.add('btn-move');
        $btn_remove_all.addEventListener("click", (e)=>{
            e.preventDefault();
            this._add_all_values($dbl_secundario, $dbl_principal, "false")
        });

        $btn_remove.innerText=label_btn_remove;
        $btn_remove.classList.add('btn-move');
        $btn_remove.addEventListener("click", (e)=>{
            e.preventDefault();
            this._addSelectedValues($dbl_secundario, $dbl_principal,"false");
        });
        
        $btn_move_cima.innerText=label_btn_up;
        $btn_move_cima.classList.add('btn-move');
        $btn_move_cima.addEventListener("click", (e)=>{
            e.preventDefault();
            this._order_up($dbl_secundario);
        });

        $btn_move_baixo.innerText=label_btn_donw
        $btn_move_baixo.classList.add('btn-move');
        $btn_move_baixo.addEventListener("click", (e)=>{
            e.preventDefault();
            this._order_down($dbl_secundario);
        });

        $div_up_down.classList.add('div-up-down');
        $div_up_down.appendChild($btn_move_cima);
        $div_up_down.appendChild($btn_move_baixo);

        $div_btn.classList.add('btn-group');
        $div_btn.appendChild($btn_add_all);
        $div_btn.appendChild($btn_add);
        $div_btn.appendChild($btn_remove);
        $div_btn.appendChild($btn_remove_all);

        $dbl_principal.setAttribute('multiple', true);
        $dbl_principal.classList.add('dbl-principal');
        $dbl_secundario.name=$dbl_principal.name;
        $dbl_principal.name="selecionar";
        $dbl_principal.addEventListener("dblclick", (e)=>{
            e.preventDefault();
            this._addSelectedValues($dbl_principal, $dbl_secundario);
        });

        $dbl_secundario.setAttribute('multiple', true);
        $dbl_secundario.classList.add('dbl-secundario');
        $dbl_secundario.addEventListener("dblclick",(e)=>{
            e.preventDefault();
            this._addSelectedValues($dbl_secundario, $dbl_principal);
        });

        $dbl_principal.parentNode.appendChild($div_dbl);

        $div_dbl.classList.add('div-dbl-select');

        $div_dbl_principal.classList.add('div-dbl-principal');
        $div_dbl_principal.appendChild($edt_search);
        $div_dbl_principal.appendChild($dbl_principal);
        $div_dbl.appendChild($div_dbl_principal);

        $div_dbl_secundario.classList.add('div-dbl-secundario');
        $div_dbl_secundario.appendChild($edt_search_sec);
        $div_dbl_secundario.appendChild($dbl_secundario);
        $div_dbl.appendChild($div_dbl_secundario);

        //$div_dbl.appendChild($dbl_principal);
        $div_dbl.appendChild($div_btn);
        $div_dbl.appendChild($div_dbl_secundario);
        $div_dbl.appendChild($div_up_down);

        this._load_secundario($dbl_principal, $dbl_secundario);
    }

    //Transfere todos os itens selecionados de um elemento 'select' para outro.
    _addSelectedValues(dbl_base, $dbl_receptor, selected){

        let options = dbl_base.querySelectorAll('option');

        options.forEach(function(item, index){
            if(item.selected){
                item.setAttribute('selected', selected);
                $dbl_receptor.appendChild(item);
            }   
        });
    }

    //Transfere todos os elementos 'option' para outro elemento 'select'
    _add_all_values($dbl_base, $dbl_receptor, selected){

        let options = $dbl_base.querySelectorAll('option');

        options.forEach(function(item, index){
            if(item.style.display=="block"){
                item.setAttribute('selected', selected);
                $dbl_receptor.appendChild(item);
            }

        });
    }

    //Filtra os elementos 'option' conteúdo de um elemento 'select'
    _filter($dbl_target, text){

        let options = $dbl_target.querySelectorAll('option');

        options.forEach(function(item, index){
            if(item.innerText.includes(text)){
                item.style.display="block";
            }else{
                item.style.display="none";
            }
        });
    }

    //Movimenta a seleção para cima
    _order_up($dbl){

        let options = $dbl.querySelectorAll('option');

        let options_selected = []
        options.forEach(function(item, index){

            if(item.selected){

                options_selected.push(item);       
            }
        });

        try{

            let option_prev = options_selected[0].previousSibling;
            options_selected.forEach(function(item){
                $dbl.insertBefore(item, option_prev);    
            });
        }catch(e){

        }
    }

    //Movimenta a seleção para baixo
    _order_down($dbl){

        let options = $dbl.querySelectorAll('option');
        let options_selected = [];

        options.forEach(function(item, index){
    
            if(item.selected){
                options_selected.push(item);  
            }
        });

        let next_element="";
        try{
            
            if( options_selected[options_selected.length-1].nextSibling.nextSibling ){
                next_element = options_selected[options_selected.length-1].nextSibling.nextSibling;
            }else{
                next_element = options[options.length];
            }

        }catch(e){
            next_element = options[0];
        }

        options_selected.forEach(function(item, index){
            if(next_element){ 
                $dbl.insertBefore(item, next_element);
            }else{
                $dbl.appendChild(item, next_element);
            }
        });
    }

    //Pega os itens setados como selected e adiciona no outro elemento select(Usado para iniciar o componente)
    _load_secundario(dbl_principal, dbl_secundario){

        let options = dbl_principal.querySelectorAll('option[selected]');

        options.forEach((item, index)=>{
                
                item.setAttribute('selected', 'true');
                dbl_secundario.appendChild(item);
        });
    }

    _add_style_block(dbl){
        let options = dbl.querySelectorAll('option');

        options.forEach(function(item){
            item.style.display="block";
        });
    }

    //Retorna uma string com os itens selecionados por um caracter passado por parâmetro
    get_selected_items(separator){

        let options = this.dbl_secundario.querySelectorAll('option');

        let array_opt = [];
        options.forEach(function(item, index){

            array_opt.push(item.innerText);
        });

        return array_opt.join(separator);
    }

    get_unselected_items(separator){

        let options = this.dbl_principal.querySelectorAll('option');

        let array_opt = [];
        options.forEach(function(item, index){

            array_opt.push(item.innerText);
        });

        return array_opt.join(separator);
    }


    

}