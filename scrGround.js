 #pragma strict

import System.Collections.Generic;

private var groundList = new GameObject[20];
public var groundObject : GameObject;
public var player : GameObject;

function Start () {
	//player = GameObject.FindWithTag ("Player") as GameObject;
	if (!groundObject) {
		groundObject = Resources.Load("Objects/Ground") as GameObject;
	}
	groundList = CreateInitialGround(20, Vector3(0,0,0));
}

function Update () {
	groundList = CreateGround();

}

function CreateInitialGround (listLength : int, anchorPos : Vector3) {
	if (listLength <= 1) {listLength = 50;}

	var list = new GameObject[listLength];
	for (var i = 0; i < list.Length; i++) {
		list[i] = GameObject.Instantiate(groundObject, anchorPos, Quaternion.identity);
		list[i].transform.position.z = (i - listLength/2) * list[i].GetComponent(Collider).bounds.size.z;
		list[i].transform.parent = gameObject.transform;
	}
	return list;

}

function CreateGround () {
	
	var playerPos = player.transform.localPosition.z;
	Debug.Log(playerPos);
	var LastGroundPos = groundList[groundList.Length-1].transform.position.z;
	if (LastGroundPos <= playerPos + groundList[groundList.Length-1].GetComponent(Collider).bounds.size.z) {

		var newList = new GameObject[groundList.Length];
		Debug.Log("new Ground");
		//////////////////
		for (var i = 1; i < groundList.Length; i++) {
			newList[i-1] = groundList[i];
		}
		newList[groundList.Length-1] = GameObject.Instantiate(groundObject, Vector3(0,0,0), Quaternion.identity);
		newList[groundList.Length-1].transform.position.z = groundList[groundList.Length-2].transform.position.z + groundList[groundList.Length-2].GetComponent(Collider).bounds.size.z;
		newList[groundList.Length-1].transform.parent = gameObject.transform;
		Destroy(groundList[0]);
		//////////////
		return newList;
	}
	else {
		return groundList;
	}
}

