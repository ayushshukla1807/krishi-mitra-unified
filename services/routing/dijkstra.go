package routing

import (
	"container/heap"
	"fmt"
	"math"
)

// Logistics Graph Node
type Edge struct {
	To     string
	Weight float64
}

type Graph map[string][]Edge

// Priority Queue Implementation for Dijkstra
type Item struct {
	value    string
	priority float64
	index    int
}

type PriorityQueue []*Item

func (pq PriorityQueue) Len() int           { return len(pq) }
func (pq PriorityQueue) Less(i, j int) bool { return pq[i].priority < pq[j].priority }
func (pq PriorityQueue) Swap(i, j int)      { pq[i], pq[j] = pq[j], pq[i]; pq[i].index = i; pq[j].index = j }

func (pq *PriorityQueue) Push(x interface{}) {
	n := len(*pq)
	item := x.(*Item)
	item.index = n
	*pq = append(*pq, item)
}

func (pq *PriorityQueue) Pop() interface{} {
	old := *pq
	n := len(old)
	item := old[n-1]
	old[n-1] = nil
	item.index = -1
	*pq = old[0 : n-1]
	return item
}

// FindShortestRoute calculates the optimal harvest logistics path
func FindShortestRoute(g Graph, start, end string) (float64, []string) {
	dist := make(map[string]float64)
	prev := make(map[string]string)
	for node := range g {
		dist[node] = math.MaxFloat64
	}
	dist[start] = 0

	pq := make(PriorityQueue, 0)
	heap.Push(&pq, &Item{value: start, priority: 0})

	for pq.Len() > 0 {
		curr := heap.Pop(&pq).(*Item).value

		if curr == end {
			break
		}

		for _, edge := range g[curr] {
			alt := dist[curr] + edge.Weight
			if alt < dist[edge.To] {
				dist[edge.To] = alt
				prev[edge.To] = curr
				heap.Push(&pq, &Item{value: edge.To, priority: alt})
			}
		}
	}

	// Reconstruct path
	path := []string{}
	for u := end; u != ""; u = prev[u] {
		path = append([]string{u}, path...)
	}

	return dist[end], path
}

func Example() {
	graph := Graph{
		"Farm_A":   {{To: "Hub_1", Weight: 10}, {To: "Hub_2", Weight: 15}},
		"Hub_1":    {{To: "Factory", Weight: 12}},
		"Hub_2":    {{To: "Factory", Weight: 5}},
		"Factory":  {},
	}

	dist, path := FindShortestRoute(graph, "Farm_A", "Factory")
	fmt.Printf("Optimal Route: %v (Weight: %.2f)\n", path, dist)
}
