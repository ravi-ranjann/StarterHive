<script>

	// Iterative JavaScript program to do merge sort on
	// linked list
	/* Structure of the Node */
	class Node {
		constructor() {
		this.data = 0;
		this.next = null;
		}
	}

	/* Function to calculate length of linked list */
	function length(current) {
		var count = 0;
		while (current != null) {
		current = current.next;
		count++;
		}
		return count;
	}

	/* Merge function of Merge Sort to Merge the two sorted parts
of the Linked List. We compare the next value of start1 and
current value of start2 and insert start2 after start1 if
it's smaller than next value of start1. We do this until
start1 or start2 end. If start1 ends, then we assign next
of start1 to start2 because start2 may have some elements
left out which are greater than the last value of start1.
If start2 ends then we assign end2 to end1. This is necessary
because we use end2 in another function (mergeSort function)
to determine the next start1 (i.e) start1 for next
iteration = end2.next */
	function merge(start1, end1, start2, end2) {
		// Making sure that first node of second
		// list is higher.
		var temp = null;
		if (start1.data > start2.data) {
		var t = start1;
		start1 = start2;
		start2 = t;
		t = end1;
		end1 = end2;
		end2 = t;
		}

		// Merging remaining nodes
		var astart = start1,
		aend = end1;
		var bstart = start2,
		bend = end2;
		var bendnext = end2.next;
		while (astart != aend && bstart != bendnext) {
		if (astart.next.data > bstart.data) {
			temp = bstart.next;
			bstart.next = astart.next;
			astart.next = bstart;
			bstart = temp;
		}
		astart = astart.next;
		}
		if (astart == aend) astart.next = bstart;
		else end2 = end1;

		return start1;
	}

	/* MergeSort of Linked List
The gap is initially 1. It is incremented as
2, 4, 8, .. until it reaches the length of the
linked list. For each gap, the linked list is
sorted around the gap.
The prevend stores the address of the last node after
sorting a part of linked list so that it's next node
can be assigned after sorting the succeeding list.
temp is used to store the next start1 because after
sorting, the last node will be different. So it
is necessary to store the address of start1 before
sorting. We select the start1, end1, start2, end2 for
sorting. start1 - end1 may be considered as a list
and start2 - end2 may be considered as another list
and we are merging these two sorted list in merge
function and assigning the starting address to the
previous end address. */
	function mergeSort(head) {
		if (head == null) return head;
		var start1 = null,
		end1 = null;
		var start2 = null,
		end2 = null;
		var prevend = null;
		var len = length(head);

		for (var gap = 1; gap < len; gap = gap * 2) {
		start1 = head;
		while (start1 != null) {
			// If this is first iteration
			var isFirstIter = false;
			if (start1 == head) isFirstIter = true;

			// First part for merging
			var counter = gap;
			end1 = start1;
			while (--counter > 0 && end1.next != null) 
			end1 = end1.next;

			// Second part for merging
			start2 = end1.next;
			if (start2 == null) break;
			counter = gap;
			end2 = start2;
			while (--counter > 0 && end2.next != null) 
			end2 = end2.next;

			// To store for next iteration.
			var temp = end2.next;

			// Merging two parts.
			merge(start1, end1, start2, end2);

			// Update head for first iteration, else
			// append after previous list
			if (isFirstIter) head = start1;
			else prevend.next = start1;

			prevend = end2;
			start1 = temp;
		}
		prevend.next = start1;
		}
		return head;
	}

	/* Function to print the Linked List */
	function print(head) {
		if (head == null) return;
		var temp = head;
		while (temp != null) {
		document.write(temp.data + " ");
		temp = temp.next;
		}
		document.write("<br>");
	}

	/* Given a reference (pointer to
pointer) to the head of a list
and an int, push a new node on
the front of the list. */
	function push(head_ref, new_data) {
		var new_node = new Node();
		new_node.data = new_data;
		new_node.next = head_ref;
		head_ref = new_node;
		return head_ref;
	}

	// Driver code
	// start with empty list
	var head = null;

	// create linked list
	// 1.2.3.4.5.6.7
	head = push(head, 7);
	head = push(head, 6);
	head = push(head, 5);
	head = push(head, 4);
	head = push(head, 3);
	head = push(head, 2);
	head = push(head, 1);

	head = mergeSort(head);

	print(head);
	
</script>
