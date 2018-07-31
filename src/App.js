import React, { Component } from "react";
import ReactDOM from "react-dom";

const App = () => {
  return (
    <div>
      <p>React here!</p>
    </div>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById("app"));

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
        alert(1);
        if (operation.value === 'getUserInfo') {
            alert(2);
            document.getElementById("response").innerHTML = getUserInfo(key.value);
        }
        if (operation.value === 'createRepo') {
            document.getElementById("response").innerHTML = createRepo(key.value, reponame.value);
        }
        if (operation.value === 'createNewIssue') {
            document.getElementById("response").innerHTML = createNewIssue(key.value, reponame.value);
        }
        if (operation.value === 'deleteIssue') {
            document.getElementById("response").innerHTML = deleteIssue(key.value, reponame.value);
        }
        if (operation.value === 'getCollaborator') {
            document.getElementById("response").innerHTML = getCollaborator(key.value, reponame.value);
        }
        if (operation.value === 'userAsCollaborator') {
            document.getElementById("response").innerHTML = userAsCollaborator(key.value, reponame.value, name.value);
        }

    } else {
        document.getElementById("response").innerHTML = "Response is empty";
    }
}



var checkJsonParse = function(jsonString){
	return new Promise(function(resolve, reject){
		try{
			var obj = JSON.parse(jsonString);
			resolve(obj);
		}
		catch(err){
			reject(err);
		}
	});
}
var a='';
function getUserInfo(opts) {
     fetch('https://api.github.com/users/antstore', {
        method: 'GET',
        mode: 'no-cors',
        json: true,
        headers: {
            "Authorization": "token " + opts,
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
            "Content-Type": "application/json"
        }
    })
    //.then((data) => { return data;});
    //.then(res => res.json())
    //.then(res => res.map(user => user.username))
    //.then(userNames => console.log(userNames));
    .then(function (response) {
           // console.log(response);
           //alert(response.json());
            return response.json();
    });
}


function createRepo(key, newrepo) {
    return fetch('https://api.github.com/user/repos', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "token " + key
        },
        body: {
            "name": newrepo,
            "auto_init": true,
            "private": false,
            "gitignore_template": "nanoc"
        }
    }).then(function (response) {
        return response.json();
    })
        .then(function (myJson) {
            console.log(myJson);
        });
}

function createNewIssue(key, reponame) {
    return fetch('https://api.github.com/repos/antstore/' + reponame + '/issues', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "token " + key
        },
        body: {
            "title": "Found a bug " + Math.random(),
            "body": "I'm having a problem with this.",
            "assignees": [
                "antstore"
            ],

            "labels": [
                "bug"
            ]
        }
    }).then(function (response) {
        return response.text();
    })
        .then(function (myJson) {
            console.log(myJson);
        });
}

function deleteIssue(key, reponame) {
    return fetch('https://api.github.com/repos/antstore/' + reponame + '/issues', {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "token " + key
        },
        body: {
            "title": "Found a bug " + Math.random(),
            "body": "I'm having a problem with this.",
            "assignees": [
                "antstore"
            ],

            "labels": [
                "bug"
            ]
        }
    }).then(function (response) {
        return response.text();
    })
        .then(function (myJson) {
            console.log(myJson);
        });
}

function getCollaborator(opts, reponame) {
    return fetch('https://api.github.com/repos/antstore/' + reponame + '/collaborators', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "token " + opts
        }
    }).then(function (response) {
        return response.text();
    })
        .then(function (myJson) {
            console.log(myJson);
        });
}

function userAsCollaborator(opts, reponame, user) {
    return fetch('https://api.github.com/repos/antstore/' + reponame + '/collaborators/' + user, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "token " + opts
        }
    }).then(function (response) {
        return response.text();
    })
        .then(function (myJson) {
            console.log(myJson);
        });
}



