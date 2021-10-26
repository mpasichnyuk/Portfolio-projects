extends Sprite


# Declare member variables here. Examples:
# var a = 2
# var b = "text"


# Called when the node enters the scene tree for the first time.
func _ready():
	pass # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _create_grass_effect():
		var GrassEffect = load ("res://Effects/GrassEffect.tscn")
		var grassEffect = GrassEffect.instance() 
		var world = get_tree().current_scene
		world.add_child(grassEffect)
		grassEffect.global_position = global_position
		queue_free()
#	pass


func _on_Hurtbox_area_entered(area):
	_create_grass_effect()
	queue_free()
