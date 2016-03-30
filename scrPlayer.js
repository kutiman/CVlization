#pragma strict

private var cam : GameObject;
private var anim : Animator;
private var moveSpeed : float = 1.6;
private var runSpeed : float = 6.6;
public var running : boolean = false;

static var runState = Animator.StringToHash("Runner.Run");
static var jumpLeftState = Animator.StringToHash("Runner.JumpLeft");
static var jumpRightState = Animator.StringToHash("Runner.JumpRight");

private var jumpingLeft = false;
private var jumpingRight = false;

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
		//transform.Translate(Vector3.forward * runSpeed * Time.deltaTime);
		if (Input.GetKeyDown(KeyCode.LeftArrow) && anim.GetCurrentAnimatorStateInfo(0).fullPathHash == runState && !anim.IsInTransition(0)) { 
			anim.SetTrigger ("jumpLeft");
			anim.ResetTrigger ("jumpRight");
		}
		if (Input.GetKeyDown(KeyCode.RightArrow) && anim.GetCurrentAnimatorStateInfo(0).fullPathHash == runState && !anim.IsInTransition(0)) { 
			anim.SetTrigger ("jumpRight");
			anim.ResetTrigger ("jumpLeft");
		}
	}
	anim.SetBool("running", running);

	if (jumpingLeft) {
		JumpLeft();
	}
	else if (jumpingRight) {
		
	}
}
//checking if the player is touching the ground
function IsGrounded(): boolean {
	return Physics.Raycast(transform.position, Vector3.down, distToGround + 0.01);
} 

public function JumpLeft () {
	
	transform.Translate(Vector3.left * 3 * Time.deltaTime);
}
public function JumpRight () {
	
	transform.Translate(Vector3.right * 3 * Time.deltaTime);
}

public function SetJump (dir : int) {
	if (dir == -1) {
		jumpingLeft = true;
	}
	else if (dir == 1) {
		jumpingRight = true;
	}
	if (dir == 0) {
		jumpingLeft = false;
		jumpingRight = false;
	}
}