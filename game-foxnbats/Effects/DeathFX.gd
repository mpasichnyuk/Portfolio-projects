extends Node2D

onready var sprite = $AnimatedSprite

# Called when the node enters the scene tree for the first time.
func _ready():
		sprite.frame = 0
		sprite.play ("default")
		

	
func _on_AnimatedSprite_animation_finished():
	queue_free()


