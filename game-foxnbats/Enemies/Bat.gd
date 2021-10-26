extends KinematicBody2D

export var ACCEL = 300
export var MAX_SPEED = 50
export var FRICTION = 200

const EnemyDeathEffect = preload("res://Effects/DeathFX.tscn")

enum {
	IDLE,
	WANDER,
	CHASE
}

onready var stats = $Stats
onready var playerDecetionZone = $PlayerDetectionZone
onready var sprite = $AnimatedSprite
var knockback = Vector2.ZERO
var state = CHASE
var velocity = Vector2.ZERO

func _physics_process(delta):
	move_and_slide(knockback)
	knockback = knockback.move_toward(Vector2.ZERO, FRICTION * delta)
	
	match state:
		IDLE:
			velocity = velocity.move_toward(Vector2.ZERO, FRICTION * delta)
			seek_player()
		WANDER:
			pass
		CHASE:
			var player = playerDecetionZone.player
			if player != null:
				var direction = (player.global_position - global_position).normalized()
				velocity = velocity.move_toward(direction*MAX_SPEED, ACCEL*delta)
			else:
				state = IDLE
					
	sprite.flip_h = velocity.x < 0	
	move_and_slide(velocity)					

func seek_player():
	if playerDecetionZone.can_see_player():
		state = CHASE

func _on_Hurtbox_area_entered(area):
	stats.health -= 1
	if stats.health <= 0 :
		queue_free()
	print (stats.health)
	knockback = area.knockback_vector * 100
	#queue_free()


func _on_Stats_no_health():
	queue_free()
	var deathfx = EnemyDeathEffect.instance()
	get_parent().add_child(deathfx)
	deathfx.global_position = global_position
