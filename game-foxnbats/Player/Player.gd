extends KinematicBody2D

const ACCEL = 250
const FRICTION = 300
const MAX_SPEED = 80
const ROLL_SPEED = 130

enum {
	MOVE,
	ROLL,
	ATTACK
}

var velocity = Vector2.ZERO
var state = MOVE
var roll_vector = Vector2.LEFT

onready var AnimationPlayer = $AnimationPlayer
onready var AnimationTree = $AnimationTree
onready var AnimationState = AnimationTree.get("parameters/playback")
onready var swordHitbox = $HitboxPivot/SwordHitbox

func _ready():
	AnimationTree.active = true
	swordHitbox.knockback_vector = roll_vector

func _process(delta):
	match state:
		MOVE:
			move_state(delta)
		ROLL:
			roll_state(delta)
		ATTACK:
			attack_state(delta)	
	
func move_state(delta):
	var input_vector = Vector2.ZERO
	input_vector.x = Input.get_action_strength("ui_right") - Input.get_action_strength("ui_left")
	input_vector.y = Input.get_action_strength("ui_down") - Input.get_action_strength("ui_up")
	input_vector = input_vector.normalized()
	
	##ANIMATION on DIRECTION INPUT
	if input_vector != Vector2.ZERO:
		roll_vector = input_vector
		swordHitbox.knockback_vector = input_vector
		AnimationTree.set("parameters/Idle/blend_position", input_vector)
		AnimationTree.set("parameters/run/blend_position", input_vector)
		AnimationTree.set("parameters/attack/blend_position", input_vector)
		AnimationTree.set("parameters/Roll/blend_position", input_vector)
		AnimationState.travel("run")
		#velocity = velocity.move_toward(input_vector*MAX_SPEED, ACCEL*delta)
		velocity = input_vector * MAX_SPEED
	else:
		AnimationState.travel("Idle")
		velocity = Vector2.ZERO
		#velocity = velocity.move_toward(Vector2.ZERO, FRICTION * delta)
	move()

	if Input.is_action_just_pressed("Roll"):
		state = ROLL
	
	if Input.is_action_just_pressed("attack"):
		state = ATTACK
	
func attack_state(delta):
	#velocity = vector2.ZERO
	AnimationState.travel("attack")
	
func roll_state(delta):
	velocity = roll_vector * ROLL_SPEED
	AnimationState.travel("Roll")
	move()
	
func roll_animation_finished():
	#velocity = velocity * 0.8
	state = MOVE	
	
func attack_animation_finished():
	state = MOVE
	
func move():
	move_and_slide(velocity)

