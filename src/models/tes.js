getAll: (queryString) => {
        return new Promise((resolve, reject) => {

            let sortBy = queryString.sort_by || 'id_book';
            let typeSort = queryString.type_sort || 'asc';
            let searching = queryString.search || '';
            let paging = parseInt(queryString.page) || 1;
            let limitation = queryString.limit || 2;
            let startLimit = (paging > 1) ? (paging * limitation) - limitation : 0;
            let availability = queryString.available;
            let totalData = 0;
            let totalPage = 0;

            conn.query(`SELECT COUNT(id_book) AS total FROM books`, (err, rows) => { // Count Total Data Book
                if(!err){
                     totalData = rows[0].total;
                     totalPage = Math.ceil(totalData/limitation);
                }else{
                    reject(err);    
                }

                let query = `SELECT COUNT(id_book) AS total FROM books `;

                const searchingIsDefined = queryString.searching != undefined;
                const availableIsDefined = queryString.available != undefined;

                if(searchingIsDefined || availableIsDefined){
                    query += `WHERE title LIKE '%${searching}%' `
                    query += searchingIsDefined && availableIsDefined ? `AND `:``
                    query += `id_status = ${availability} `
                }

                conn.query(query, (err, rows) => {
                    if(!err){
                        totalData = rows[0].total;
                        totalPage = Math.ceil(totalData/limitation);
                    }else{
                        reject(err)
                    }
                })

            })
        })
    }