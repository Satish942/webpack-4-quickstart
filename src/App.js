
var btn = document.querySelector('button');
var form = document.querySelector('form');
btn.addEventListener('click', testResults);



function testResults() {
    var name = form.querySelector('input[name="name"]');
    var key = form.querySelector('input[name="key"]');
    var reponame = form.querySelector('input[name="reponame"]');
    var operation = form.querySelector('select[name="operation"]');
    //alert(name.value); alert(key.value) ; alert(reponame.value);
    //alert(operation.value);
    if (key.value != null && operation.value != null) {
       // alert(1);
        if (operation.value === 'getUserInfo') {
            document.getElementById("response").value = getUserInfo(key.value);
        }
        if (operation.value === 'createRepo') {
            if ( reponame.value != null && reponame.value !='')
            document.getElementById("response").value = createRepo(key.value, reponame.value);
        }
        if (operation.value === 'createNewIssue') {
            if ( reponame.value != null && reponame.value !='')
            document.getElementById("response").value = createNewIssue(key.value, reponame.value);
        }
        if (operation.value === 'deleteIssue') {
            if ( reponame.value != null && reponame.value !='')
            document.getElementById("response").value = deleteIssue(key.value, reponame.value);
        }
        if (operation.value === 'getCollaborator') {
            if ( reponame.value != null && reponame.value !='')
            document.getElementById("response").value = getCollaborator(key.value, reponame.value);
        }
        if (operation.value === 'userAsCollaborator') {
            if (( reponame.value != null && reponame.value !='')&& ( name.value != null && name.value !=''))
            document.getElementById("response").value = userAsCollaborator(key.value, reponame.value, name.value);
        }

    } else {
        document.getElementById("response").value = "Response is empty";
    }
}

function getUserInfo(opts) {
     fetch('https://api.github.com/users/antstore', {
        method: 'GET',
        headers: {
            "Authorization": "token " + opts,
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (response.status === 200) {
                return response.text();
            } else {
                return response.status;
            }
        }).then(function (myJson) {
            document.getElementById("response").value = myJson;
            console.log(myJson);
        });
}

function createRepo(opts, newrepo) {
    fetch('https://api.github.com/user/repos', {
       method: 'POST',
       headers: {
        "Authorization": "token " + opts,
        "Content-Type": "application/json"
       },
       body: JSON.stringify({
           "name": newrepo,
           "auto_init": true,
           "private": false,
           "gitignore_template": 'nanoc'
       })
   }).then(response => {
       if (response.status === 200) {
           return response.text();
       } else {
        return response.text();
       }
   }).then(function (myJson) {
       document.getElementById("response").value = myJson;
       console.log(myJson);
   });
}

function createNewIssue(opts, reponame) {
    fetch('https://api.github.com/repos/antstore/' + reponame + '/issues', {
       method: 'POST',
       headers: {
           "Content-Type": "application/json; charset=utf-8",
           "Authorization": "token " + opts
       },
       body: JSON.stringify({
           "title": "Found a bug " + Math.random(),
           "body": "I'm having a problem with this.",
           "assignees": [
               "antstore"
           ],

           "labels": [
               "bug"
           ]
       })
   }).then(response => {
       if (response.status === 200) {
           return response.text();
       } else {
        return response.text();
       }
   }).then(function (myJson) {
       document.getElementById("response").value = myJson;
       console.log(myJson);
   });
}

function deleteIssue(opts, reponame) {
    fetch('https://api.github.com/repos/antstore/' + reponame + '/issues', {
       method: 'DELETE',
       headers: {
           "Content-Type": "application/json; charset=utf-8",
           "Authorization": "token " + opts,
           'User-agent': 'Mozilla/4.0 Custom User Agent'
       },
       body: JSON.stringify({
           "title": "Found a bug " + Math.random(),
           "body": "I'm having a problem with this.",
           "assignees": [
               "antstore"
           ],

           "labels": [
               "bug"
           ]
       })
   }).then(response => {
       if (response.status === 200) {
           return response.text();
       } else {
        return response.text();
       }
   }).then(function (myJson) {
       document.getElementById("response").value = myJson;
       console.log(myJson);
   });
}

function getCollaborator(opts, reponame) {
    fetch('https://api.github.com/repos/antstore/' + reponame + '/collaborators', {
       method: 'GET',
       headers: {
           "Content-Type": "application/json",
           "Authorization": "token " + opts
       }
   }).then(response => {
       if (response.status === 200) {
           return response.text();
       } else {
        return response.text();
       }
   }).then(function (myJson) {
       document.getElementById("response").value = myJson;
       console.log(myJson);
   });
}

function userAsCollaborator(opts, reponame, user) {
    fetch('https://api.github.com/repos/antstore/' + reponame + '/collaborators/' + user, {
       method: 'PUT',
       headers: {
           "Content-Type": "application/json; charset=utf-8",
           "Authorization": "token " + opts
       }
   }).then(response => {
       if (response.status === 200) {
           return response.text();
       } else {
        return response.text();
       }
   }).then(function (myJson) {
       document.getElementById("response").value = myJson;
       console.log(myJson);
   });
}



