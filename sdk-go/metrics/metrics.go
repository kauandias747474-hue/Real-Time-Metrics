package metrics


type SystemMetrics struct {
	SensorID string
	Value    float64
}

func NewMetric(id string, val float64) SystemMetrics {
	return SystemMetrics{
		SensorID: id,
		Value:    val,
	}
}
