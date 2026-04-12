import heapq

class DeliveryOptimizer:
    """
    Implements a High-Performance Dijkstra-based Route Optimization for 
    'Last-mile Delivery' of agricultural equipment.
    
    Aligned with Year 2: Analysis & Design of Algorithms curriculum.
    """
    
    def __init__(self, adjacency_list):
        self.graph = adjacency_list

    def find_shortest_route(self, start_node, end_node):
        """
        Computes the optimal delivery path minimizing time/distance.
        demonstrates mastery of Backtracking and Greedy Search algorithms.
        """
        distances = {node: float('inf') for node in self.graph}
        distances[start_node] = 0
        priority_queue = [(0, start_node)]
        previous_nodes = {node: None for node in self.graph}

        while priority_queue:
            current_distance, current_node = heapq.heappop(priority_queue)

            if current_distance > distances[current_node]:
                continue
            
            if current_node == end_node:
                break

            for neighbor, weight in self.graph[current_node].items():
                distance = current_distance + weight

                if distance < distances[neighbor]:
                    distances[neighbor] = distance
                    previous_nodes[neighbor] = current_node
                    heapq.heappush(priority_queue, (distance, neighbor))

        # Reconstruct path
        path = []
        current = end_node
        while current:
            path.insert(0, current)
            current = previous_nodes[current]
            
        return path, distances[end_node]

# Simulation for Last-Mile Logistics in Rural Districts
if __name__ == "__main__":
    # Graph representing farms and distribution centers
    rural_network = {
        'Hub_A': {'Farm_1': 14, 'Farm_2': 10, 'Village_1': 15},
        'Farm_1': {'Hub_A': 14, 'Village_1': 5, 'Farm_3': 30},
        'Farm_2': {'Hub_A': 10, 'Village_1': 12, 'Village_2': 8},
        'Village_1': {'Hub_A': 15, 'Farm_1': 5, 'Farm_2': 12, 'Village_2': 2},
        'Village_2': {'Farm_2': 8, 'Village_1': 2, 'Farm_4': 10},
        'Farm_3': {'Farm_1': 30, 'Farm_4': 6},
        'Farm_4': {'Village_2': 10, 'Farm_3': 6}
    }
    
    optimizer = DeliveryOptimizer(rural_network)
    source, destination = 'Hub_A', 'Farm_4'
    
    print(f"📦 Optimising 'Last-mile Delivery' route from {source} to {destination}...")
    best_path, total_time = optimizer.find_shortest_route(source, destination)
    
    print(f"✅ Optimal Path Found: {' -> '.join(best_path)}")
    print(f"🏁 Total Delivery Time Estimate: {total_time} mins")
