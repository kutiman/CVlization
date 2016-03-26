#pragma strict



private var cam : GameObject;
private var anim : Animator;
private var moveSpeed : float = 1.6;
private var runSpeed : float = 6.6;
public var running : boolean = false;

var distToGround: float;

function Start () {
	cam = GameObject.FindWithTag("MainCamera");
	anim = gameObject.GetComponent(Animator);
	// get the distance to ground
	distToGround = 0.0;
}

function Update () {
	
	anim.SetBool ("isGrounded", IsGrounded());
	// Players movement when in the lobby
	if (!running) {
		if (Input.GetKey(KeyCode.LeftArrow)) {
			transform.rotation = Quaternion.Euler(0, -90, 0); // rotating the player in the right direction, better if relative to camera
			anim.SetFloat ("xMove", 0.5);
			transform.Translate(Vector3.forward * moveSpeed * Time.deltaTime);
		}
		else if (Input.GetKey(KeyCode.RightArrow)) {
			//transform.rotation.y = cam.transform.rotation.y + 90;
			transform.rotation = Quaternion.Euler(0,90, 0);
			if (IsGrounded()) {
				anim.SetFloat ("xMove", 0.5);
			}
			transform.Translate(Vector3.forward * moveSpeed * Time.deltaTime);
		}
		else {
			anim.SetFloat ("xMove", 0.0);
		}

		if (Input.GetKeyDown(KeyCode.Space) && IsGrounded()) {
			anim.SetTrigger ("punch");
			GetComponent(Rigidbody).AddForce(Vector3.up * 230);
		}
	} //*** End player's movement in lobby***
	else {
		transform.Translate(Vector3.forward * runSpeed * Time.deltaTime);
	}
	anim.SetBool("running", running);
}
//checking if the player is touching the ground
function IsGrounded(): boolean {
	return Physics.Raycast(transform.position, Vector3.down, distToGround + 0.01);
} 
