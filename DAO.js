module.exports = {
    insert:  (tableName, fields, values) => {  
        let crietria = "";
        let projection = "";
        for (i in fields) {
            if (i != fields.length - 1)
                crietria = crietria + " " + fields[i] + ',';
            else {
                crietria = crietria + " " + fields[i];
            }
        }
        for (i in values) {
            if (i == values.length - 1)
                if (typeof values[i]=='string'){
                    projection = projection + `"${values[i]}"`;
                    
                }
                else{
                    projection = projection + `${values[i]}`;
                }
            else {
                if (typeof values[i] === "string"){
                    projection = projection + `"${values[i]}" ,`;
                    
                }
                else{
                    projection = projection + `${values[i]} ,`;
                }
            }
        }
        sql = `INSERT INTO ${tableName} (${crietria}) values (${projection})`;
        return new Promise((resolve, reject) => {
            con.query(sql,(err,result)=>{
                
                if (err) {console.log(err);}
                
                resolve(result);
            });
        });
    },

    find: (tableName,project,condition,group,order) =>{
        projection ="";
        tables = "";
        for(i in tableName){
            if (i == tableName.length - 1)
                tables = tables + tableName[i];
            else{
                tables = tables + tableName[i] + ',';
            }    
        }
        for(i in project){
            if (i == project.length - 1)
                projection = projection + project[i];
            else{
                projection = projection + project[i] + ',';
            }    
        }
        if(!condition)
            sql = `SELECT ${projection} from ${tableName}`;
        else if (group){
            sql = `SELECT ${projection} from ${tableName} where ${condition} group by ${group}`;
            if(order){
                sql = `SELECT ${projection} from ${tableName} where ${condition} group by ${group} order by ${order}`;
            }
        }   
        else
            sql = `SELECT ${projection} from ${tableName} where ${condition}`;
            
        return new Promise((resolve, reject) => {
            con.query(sql,(err,result)=>{
              // console.log(sql)
                if (err) {console.log(err);}
                // console.log("result",result);
                
                resolve(result);
            });
        });
    },

    update: (tableName,set,condition)=>{
        set_values = "";
        for(i in set){
            if (i == set.length - 1)
                set_values = set_values + set[i];
            else{
                set_values = set_values + set[i] + ',';
            }    
        }
        if(!condition)
            sql = `UPDATE ${tableName} set ${set_values}`;
        else
            sql = `UPDATE ${tableName} set ${set_values} where ${condition}`;
        
        return new Promise((resolve, reject) => {
            con.query(sql,(err,result)=>{
                //console.log(sql);
                if (err) {console.log(err);}
                
                resolve(result);
            });
        }); 
    }
}
