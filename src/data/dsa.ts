export interface DSAProblem {
  id: string;
  title: string;
  leetcodeNumber: number;
  leetcodeUrl: string;
  pattern: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  dayNumber?: number;
  isFrequentlyAsked?: boolean;
}

export interface DSAPattern {
  name: string;
  slug: string;
  description: string;
  problems: DSAProblem[];
}

export const DSA_PATTERNS: DSAPattern[] = [
  {
    name: 'Arrays & Hashing',
    slug: 'arrays-hashing',
    description: 'Foundation pattern — frequency maps, prefix sums, in-place operations',
    problems: [
      { id: 'lc-1',   title: 'Two Sum',                        leetcodeNumber: 1,   leetcodeUrl: 'https://leetcode.com/problems/two-sum/',                        pattern: 'Arrays & Hashing', difficulty: 'Easy',   dayNumber: 1,  isFrequentlyAsked: true  },
      { id: 'lc-217', title: 'Contains Duplicate',             leetcodeNumber: 217, leetcodeUrl: 'https://leetcode.com/problems/contains-duplicate/',             pattern: 'Arrays & Hashing', difficulty: 'Easy',   dayNumber: 1  },
      { id: 'lc-242', title: 'Valid Anagram',                  leetcodeNumber: 242, leetcodeUrl: 'https://leetcode.com/problems/valid-anagram/',                  pattern: 'Arrays & Hashing', difficulty: 'Easy',   dayNumber: 2  },
      { id: 'lc-49',  title: 'Group Anagrams',                 leetcodeNumber: 49,  leetcodeUrl: 'https://leetcode.com/problems/group-anagrams/',                 pattern: 'Arrays & Hashing', difficulty: 'Medium', dayNumber: 3,  isFrequentlyAsked: true  },
      { id: 'lc-347', title: 'Top K Frequent Elements',        leetcodeNumber: 347, leetcodeUrl: 'https://leetcode.com/problems/top-k-frequent-elements/',        pattern: 'Arrays & Hashing', difficulty: 'Medium', dayNumber: 3,  isFrequentlyAsked: true  },
      { id: 'lc-238', title: 'Product of Array Except Self',   leetcodeNumber: 238, leetcodeUrl: 'https://leetcode.com/problems/product-of-array-except-self/',   pattern: 'Arrays & Hashing', difficulty: 'Medium', dayNumber: 4,  isFrequentlyAsked: true  },
      { id: 'lc-53',  title: 'Maximum Subarray (Kadane\'s)',   leetcodeNumber: 53,  leetcodeUrl: 'https://leetcode.com/problems/maximum-subarray/',               pattern: 'Arrays & Hashing', difficulty: 'Medium', dayNumber: 4,  isFrequentlyAsked: true  },
      { id: 'lc-128', title: 'Longest Consecutive Sequence',   leetcodeNumber: 128, leetcodeUrl: 'https://leetcode.com/problems/longest-consecutive-sequence/',   pattern: 'Arrays & Hashing', difficulty: 'Medium', dayNumber: 23 },
      { id: 'lc-73',  title: 'Set Matrix Zeroes',              leetcodeNumber: 73,  leetcodeUrl: 'https://leetcode.com/problems/set-matrix-zeroes/',              pattern: 'Arrays & Hashing', difficulty: 'Medium', dayNumber: 27 },
      { id: 'lc-54',  title: 'Spiral Matrix',                  leetcodeNumber: 54,  leetcodeUrl: 'https://leetcode.com/problems/spiral-matrix/',                  pattern: 'Arrays & Hashing', difficulty: 'Medium', dayNumber: 25 },
      { id: 'lc-189', title: 'Rotate Array',                   leetcodeNumber: 189, leetcodeUrl: 'https://leetcode.com/problems/rotate-array/',                   pattern: 'Arrays & Hashing', difficulty: 'Medium', dayNumber: 25 },
    ],
  },
  {
    name: 'Two Pointers',
    slug: 'two-pointers',
    description: 'Use two indices moving toward each other or in same direction',
    problems: [
      { id: 'lc-125', title: 'Valid Palindrome',                      leetcodeNumber: 125, leetcodeUrl: 'https://leetcode.com/problems/valid-palindrome/',                        pattern: 'Two Pointers', difficulty: 'Easy',   dayNumber: 5  },
      { id: 'lc-167', title: 'Two Sum II - Input Array Is Sorted',    leetcodeNumber: 167, leetcodeUrl: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/',        pattern: 'Two Pointers', difficulty: 'Medium', dayNumber: 5  },
      { id: 'lc-15',  title: '3Sum',                                  leetcodeNumber: 15,  leetcodeUrl: 'https://leetcode.com/problems/3sum/',                                    pattern: 'Two Pointers', difficulty: 'Medium', dayNumber: 6  },
      { id: 'lc-11',  title: 'Container With Most Water',             leetcodeNumber: 11,  leetcodeUrl: 'https://leetcode.com/problems/container-with-most-water/',               pattern: 'Two Pointers', difficulty: 'Medium', dayNumber: 6  },
      { id: 'lc-42',  title: 'Trapping Rain Water',                   leetcodeNumber: 42,  leetcodeUrl: 'https://leetcode.com/problems/trapping-rain-water/',                     pattern: 'Two Pointers', difficulty: 'Hard',   dayNumber: 19, isFrequentlyAsked: true  },
      { id: 'lc-75',  title: 'Sort Colors (Dutch Flag)',              leetcodeNumber: 75,  leetcodeUrl: 'https://leetcode.com/problems/sort-colors/',                             pattern: 'Two Pointers', difficulty: 'Medium', dayNumber: 24 },
      { id: 'lc-5',   title: 'Longest Palindromic Substring',         leetcodeNumber: 5,   leetcodeUrl: 'https://leetcode.com/problems/longest-palindromic-substring/',           pattern: 'Two Pointers', difficulty: 'Medium', dayNumber: 25, isFrequentlyAsked: true  },
    ],
  },
  {
    name: 'Sliding Window',
    slug: 'sliding-window',
    description: 'Maintain a window of elements satisfying a constraint',
    problems: [
      { id: 'lc-121', title: 'Best Time to Buy and Sell Stock',                leetcodeNumber: 121, leetcodeUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',              pattern: 'Sliding Window', difficulty: 'Easy',   dayNumber: 2,  isFrequentlyAsked: true  },
      { id: 'lc-3',   title: 'Longest Substring Without Repeating Characters', leetcodeNumber: 3,   leetcodeUrl: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', pattern: 'Sliding Window', difficulty: 'Medium', dayNumber: 7,  isFrequentlyAsked: true  },
      { id: 'lc-567', title: 'Permutation in String',                          leetcodeNumber: 567, leetcodeUrl: 'https://leetcode.com/problems/permutation-in-string/',                        pattern: 'Sliding Window', difficulty: 'Medium', dayNumber: 8  },
      { id: 'lc-76',  title: 'Minimum Window Substring',                       leetcodeNumber: 76,  leetcodeUrl: 'https://leetcode.com/problems/minimum-window-substring/',                     pattern: 'Sliding Window', difficulty: 'Hard',   dayNumber: 8,  isFrequentlyAsked: true  },
      { id: 'lc-239', title: 'Sliding Window Maximum',                         leetcodeNumber: 239, leetcodeUrl: 'https://leetcode.com/problems/sliding-window-maximum/',                       pattern: 'Sliding Window', difficulty: 'Hard',   dayNumber: 22 },
    ],
  },
  {
    name: 'Stack',
    slug: 'stack',
    description: 'LIFO structure for nested/sequential problems, monotonic stacks',
    problems: [
      { id: 'lc-20',  title: 'Valid Parentheses',                leetcodeNumber: 20,  leetcodeUrl: 'https://leetcode.com/problems/valid-parentheses/',                pattern: 'Stack', difficulty: 'Easy',   dayNumber: 9  },
      { id: 'lc-155', title: 'Min Stack',                        leetcodeNumber: 155, leetcodeUrl: 'https://leetcode.com/problems/min-stack/',                        pattern: 'Stack', difficulty: 'Medium', dayNumber: 9  },
      { id: 'lc-150', title: 'Evaluate Reverse Polish Notation',  leetcodeNumber: 150, leetcodeUrl: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/', pattern: 'Stack', difficulty: 'Medium', dayNumber: 10 },
      { id: 'lc-739', title: 'Daily Temperatures',               leetcodeNumber: 739, leetcodeUrl: 'https://leetcode.com/problems/daily-temperatures/',               pattern: 'Stack', difficulty: 'Medium', dayNumber: 10 },
      { id: 'lc-22',  title: 'Generate Parentheses',             leetcodeNumber: 22,  leetcodeUrl: 'https://leetcode.com/problems/generate-parentheses/',             pattern: 'Stack', difficulty: 'Medium', dayNumber: 11 },
      { id: 'lc-853', title: 'Car Fleet',                        leetcodeNumber: 853, leetcodeUrl: 'https://leetcode.com/problems/car-fleet/',                        pattern: 'Stack', difficulty: 'Medium', dayNumber: 11 },
      { id: 'lc-84',  title: 'Largest Rectangle in Histogram',   leetcodeNumber: 84,  leetcodeUrl: 'https://leetcode.com/problems/largest-rectangle-in-histogram/',   pattern: 'Stack', difficulty: 'Hard',   dayNumber: 26 },
    ],
  },
  {
    name: 'Binary Search',
    slug: 'binary-search',
    description: 'Eliminate half the search space each iteration on sorted data',
    problems: [
      { id: 'lc-704', title: 'Binary Search',                          leetcodeNumber: 704, leetcodeUrl: 'https://leetcode.com/problems/binary-search/',                           pattern: 'Binary Search', difficulty: 'Easy',   dayNumber: 16 },
      { id: 'lc-74',  title: 'Search a 2D Matrix',                     leetcodeNumber: 74,  leetcodeUrl: 'https://leetcode.com/problems/search-a-2d-matrix/',                      pattern: 'Binary Search', difficulty: 'Medium', dayNumber: 16 },
      { id: 'lc-875', title: 'Koko Eating Bananas',                    leetcodeNumber: 875, leetcodeUrl: 'https://leetcode.com/problems/koko-eating-bananas/',                     pattern: 'Binary Search', difficulty: 'Medium', dayNumber: 17 },
      { id: 'lc-153', title: 'Find Minimum in Rotated Sorted Array',   leetcodeNumber: 153, leetcodeUrl: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/',    pattern: 'Binary Search', difficulty: 'Medium', dayNumber: 17 },
      { id: 'lc-33',  title: 'Search in Rotated Sorted Array',         leetcodeNumber: 33,  leetcodeUrl: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',          pattern: 'Binary Search', difficulty: 'Medium', dayNumber: 18 },
      { id: 'lc-981', title: 'Time Based Key-Value Store',             leetcodeNumber: 981, leetcodeUrl: 'https://leetcode.com/problems/time-based-key-value-store/',              pattern: 'Binary Search', difficulty: 'Medium', dayNumber: 18 },
      { id: 'lc-4',   title: 'Median of Two Sorted Arrays',            leetcodeNumber: 4,   leetcodeUrl: 'https://leetcode.com/problems/median-of-two-sorted-arrays/',             pattern: 'Binary Search', difficulty: 'Hard',   dayNumber: 19 },
    ],
  },
  {
    name: 'Linked List',
    slug: 'linked-list',
    description: 'Pointer manipulation, fast/slow pointers, reversals',
    problems: [
      { id: 'lc-206', title: 'Reverse Linked List',              leetcodeNumber: 206, leetcodeUrl: 'https://leetcode.com/problems/reverse-linked-list/',              pattern: 'Linked List', difficulty: 'Easy',   dayNumber: 12, isFrequentlyAsked: true  },
      { id: 'lc-21',  title: 'Merge Two Sorted Lists',           leetcodeNumber: 21,  leetcodeUrl: 'https://leetcode.com/problems/merge-two-sorted-lists/',           pattern: 'Linked List', difficulty: 'Easy',   dayNumber: 12, isFrequentlyAsked: true  },
      { id: 'lc-141', title: 'Linked List Cycle',                leetcodeNumber: 141, leetcodeUrl: 'https://leetcode.com/problems/linked-list-cycle/',                pattern: 'Linked List', difficulty: 'Easy',   dayNumber: 13, isFrequentlyAsked: true  },
      { id: 'lc-143', title: 'Reorder List',                     leetcodeNumber: 143, leetcodeUrl: 'https://leetcode.com/problems/reorder-list/',                     pattern: 'Linked List', difficulty: 'Medium', dayNumber: 13 },
      { id: 'lc-19',  title: 'Remove Nth Node From End of List', leetcodeNumber: 19,  leetcodeUrl: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/', pattern: 'Linked List', difficulty: 'Medium', dayNumber: 14 },
      { id: 'lc-287', title: 'Find the Duplicate Number',        leetcodeNumber: 287, leetcodeUrl: 'https://leetcode.com/problems/find-the-duplicate-number/',        pattern: 'Linked List', difficulty: 'Medium', dayNumber: 14 },
      { id: 'lc-146', title: 'LRU Cache',                        leetcodeNumber: 146, leetcodeUrl: 'https://leetcode.com/problems/lru-cache/',                        pattern: 'Linked List', difficulty: 'Medium', dayNumber: 15, isFrequentlyAsked: true  },
      { id: 'lc-23',  title: 'Merge K Sorted Lists',             leetcodeNumber: 23,  leetcodeUrl: 'https://leetcode.com/problems/merge-k-sorted-lists/',             pattern: 'Linked List', difficulty: 'Hard',   dayNumber: 15, isFrequentlyAsked: true  },
    ],
  },
  {
    name: 'Trees',
    slug: 'trees',
    description: 'DFS/BFS traversals, BST properties, recursive tree patterns',
    problems: [
      { id: 'lc-226', title: 'Invert Binary Tree',                                       leetcodeNumber: 226,  leetcodeUrl: 'https://leetcode.com/problems/invert-binary-tree/',                                        pattern: 'Trees', difficulty: 'Easy',   dayNumber: 34 },
      { id: 'lc-104', title: 'Maximum Depth of Binary Tree',                             leetcodeNumber: 104,  leetcodeUrl: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/',                              pattern: 'Trees', difficulty: 'Easy',   dayNumber: 34 },
      { id: 'lc-543', title: 'Diameter of Binary Tree',                                  leetcodeNumber: 543,  leetcodeUrl: 'https://leetcode.com/problems/diameter-of-binary-tree/',                                   pattern: 'Trees', difficulty: 'Easy',   dayNumber: 34 },
      { id: 'lc-110', title: 'Balanced Binary Tree',                                     leetcodeNumber: 110,  leetcodeUrl: 'https://leetcode.com/problems/balanced-binary-tree/',                                      pattern: 'Trees', difficulty: 'Easy',   dayNumber: 34 },
      { id: 'lc-102', title: 'Binary Tree Level Order Traversal',                        leetcodeNumber: 102,  leetcodeUrl: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',                         pattern: 'Trees', difficulty: 'Medium', dayNumber: 35, isFrequentlyAsked: true  },
      { id: 'lc-199', title: 'Binary Tree Right Side View',                              leetcodeNumber: 199,  leetcodeUrl: 'https://leetcode.com/problems/binary-tree-right-side-view/',                               pattern: 'Trees', difficulty: 'Medium', dayNumber: 35 },
      { id: 'lc-236', title: 'Lowest Common Ancestor of a Binary Tree',                  leetcodeNumber: 236,  leetcodeUrl: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/',                   pattern: 'Trees', difficulty: 'Medium', dayNumber: 35, isFrequentlyAsked: true  },
      { id: 'lc-98',  title: 'Validate Binary Search Tree',                              leetcodeNumber: 98,   leetcodeUrl: 'https://leetcode.com/problems/validate-binary-search-tree/',                               pattern: 'Trees', difficulty: 'Medium', dayNumber: 36, isFrequentlyAsked: true  },
      { id: 'lc-230', title: 'Kth Smallest Element in a BST',                            leetcodeNumber: 230,  leetcodeUrl: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/',                             pattern: 'Trees', difficulty: 'Medium', dayNumber: 36 },
      { id: 'lc-124', title: 'Binary Tree Maximum Path Sum',                             leetcodeNumber: 124,  leetcodeUrl: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/',                              pattern: 'Trees', difficulty: 'Hard',   dayNumber: 37, isFrequentlyAsked: true  },
      { id: 'lc-297', title: 'Serialize and Deserialize Binary Tree',                    leetcodeNumber: 297,  leetcodeUrl: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/',                     pattern: 'Trees', difficulty: 'Hard',   dayNumber: 37, isFrequentlyAsked: true  },
    ],
  },
  {
    name: 'Trie',
    slug: 'trie',
    description: 'Prefix tree for efficient string search and autocomplete',
    problems: [
      { id: 'lc-208', title: 'Implement Trie (Prefix Tree)',                   leetcodeNumber: 208, leetcodeUrl: 'https://leetcode.com/problems/implement-trie-prefix-tree/',                   pattern: 'Trie', difficulty: 'Medium', dayNumber: 38 },
      { id: 'lc-211', title: 'Design Add and Search Words Data Structure',     leetcodeNumber: 211, leetcodeUrl: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/',   pattern: 'Trie', difficulty: 'Medium', dayNumber: 38 },
      { id: 'lc-212', title: 'Word Search II',                                 leetcodeNumber: 212, leetcodeUrl: 'https://leetcode.com/problems/word-search-ii/',                               pattern: 'Trie', difficulty: 'Hard',   dayNumber: 38 },
    ],
  },
  {
    name: 'Heap / Priority Queue',
    slug: 'heap',
    description: 'Min/max heap for k-th element problems and stream processing',
    problems: [
      { id: 'lc-215', title: 'Kth Largest Element in an Array',  leetcodeNumber: 215, leetcodeUrl: 'https://leetcode.com/problems/kth-largest-element-in-an-array/', pattern: 'Heap / Priority Queue', difficulty: 'Medium', dayNumber: 20 },
      { id: 'lc-973', title: 'K Closest Points to Origin',       leetcodeNumber: 973, leetcodeUrl: 'https://leetcode.com/problems/k-closest-points-to-origin/',      pattern: 'Heap / Priority Queue', difficulty: 'Medium', dayNumber: 20 },
      { id: 'lc-621', title: 'Task Scheduler',                   leetcodeNumber: 621, leetcodeUrl: 'https://leetcode.com/problems/task-scheduler/',                   pattern: 'Heap / Priority Queue', difficulty: 'Medium', dayNumber: 21, isFrequentlyAsked: true  },
      { id: 'lc-295', title: 'Find Median from Data Stream',     leetcodeNumber: 295, leetcodeUrl: 'https://leetcode.com/problems/find-median-from-data-stream/',    pattern: 'Heap / Priority Queue', difficulty: 'Hard',   dayNumber: 21, isFrequentlyAsked: true  },
      { id: 'lc-692', title: 'Top K Frequent Words',             leetcodeNumber: 692, leetcodeUrl: 'https://leetcode.com/problems/top-k-frequent-words/',            pattern: 'Heap / Priority Queue', difficulty: 'Medium', dayNumber: 22 },
      { id: 'lc-253', title: 'Meeting Rooms II',                 leetcodeNumber: 253, leetcodeUrl: 'https://leetcode.com/problems/meeting-rooms-ii/',                pattern: 'Heap / Priority Queue', difficulty: 'Medium', dayNumber: 50, isFrequentlyAsked: true  },
    ],
  },
  {
    name: 'Backtracking',
    slug: 'backtracking',
    description: 'Explore all possibilities: choose → explore → unchoose',
    problems: [
      { id: 'lc-78',  title: 'Subsets',                    leetcodeNumber: 78,  leetcodeUrl: 'https://leetcode.com/problems/subsets/',                    pattern: 'Backtracking', difficulty: 'Medium', dayNumber: 39 },
      { id: 'lc-90',  title: 'Subsets II',                 leetcodeNumber: 90,  leetcodeUrl: 'https://leetcode.com/problems/subsets-ii/',                 pattern: 'Backtracking', difficulty: 'Medium', dayNumber: 39 },
      { id: 'lc-39',  title: 'Combination Sum',            leetcodeNumber: 39,  leetcodeUrl: 'https://leetcode.com/problems/combination-sum/',            pattern: 'Backtracking', difficulty: 'Medium', dayNumber: 39 },
      { id: 'lc-40',  title: 'Combination Sum II',         leetcodeNumber: 40,  leetcodeUrl: 'https://leetcode.com/problems/combination-sum-ii/',         pattern: 'Backtracking', difficulty: 'Medium', dayNumber: 40 },
      { id: 'lc-46',  title: 'Permutations',               leetcodeNumber: 46,  leetcodeUrl: 'https://leetcode.com/problems/permutations/',               pattern: 'Backtracking', difficulty: 'Medium', dayNumber: 40 },
      { id: 'lc-47',  title: 'Permutations II',            leetcodeNumber: 47,  leetcodeUrl: 'https://leetcode.com/problems/permutations-ii/',            pattern: 'Backtracking', difficulty: 'Medium', dayNumber: 40 },
      { id: 'lc-51',  title: 'N-Queens',                   leetcodeNumber: 51,  leetcodeUrl: 'https://leetcode.com/problems/n-queens/',                   pattern: 'Backtracking', difficulty: 'Hard',   dayNumber: 41, isFrequentlyAsked: true  },
      { id: 'lc-79',  title: 'Word Search',                leetcodeNumber: 79,  leetcodeUrl: 'https://leetcode.com/problems/word-search/',                pattern: 'Backtracking', difficulty: 'Medium', dayNumber: 27 },
    ],
  },
  {
    name: 'Graphs',
    slug: 'graphs',
    description: 'BFS/DFS, topological sort, union-find, shortest path algorithms',
    problems: [
      { id: 'lc-200', title: 'Number of Islands',                         leetcodeNumber: 200, leetcodeUrl: 'https://leetcode.com/problems/number-of-islands/',                         pattern: 'Graphs', difficulty: 'Medium', dayNumber: 42, isFrequentlyAsked: true  },
      { id: 'lc-133', title: 'Clone Graph',                               leetcodeNumber: 133, leetcodeUrl: 'https://leetcode.com/problems/clone-graph/',                               pattern: 'Graphs', difficulty: 'Medium', dayNumber: 42, isFrequentlyAsked: true  },
      { id: 'lc-695', title: 'Max Area of Island',                        leetcodeNumber: 695, leetcodeUrl: 'https://leetcode.com/problems/max-area-of-island/',                        pattern: 'Graphs', difficulty: 'Medium', dayNumber: 42 },
      { id: 'lc-417', title: 'Pacific Atlantic Water Flow',                leetcodeNumber: 417, leetcodeUrl: 'https://leetcode.com/problems/pacific-atlantic-water-flow/',                pattern: 'Graphs', difficulty: 'Medium', dayNumber: 42 },
      { id: 'lc-207', title: 'Course Schedule',                           leetcodeNumber: 207, leetcodeUrl: 'https://leetcode.com/problems/course-schedule/',                           pattern: 'Graphs', difficulty: 'Medium', dayNumber: 43, isFrequentlyAsked: true  },
      { id: 'lc-210', title: 'Course Schedule II',                        leetcodeNumber: 210, leetcodeUrl: 'https://leetcode.com/problems/course-schedule-ii/',                        pattern: 'Graphs', difficulty: 'Medium', dayNumber: 43 },
      { id: 'lc-684', title: 'Redundant Connection',                      leetcodeNumber: 684, leetcodeUrl: 'https://leetcode.com/problems/redundant-connection/',                      pattern: 'Graphs', difficulty: 'Medium', dayNumber: 43 },
      { id: 'lc-743', title: 'Network Delay Time (Dijkstra)',             leetcodeNumber: 743, leetcodeUrl: 'https://leetcode.com/problems/network-delay-time/',                        pattern: 'Graphs', difficulty: 'Medium', dayNumber: 44, isFrequentlyAsked: true  },
      { id: 'lc-127', title: 'Word Ladder',                               leetcodeNumber: 127, leetcodeUrl: 'https://leetcode.com/problems/word-ladder/',                               pattern: 'Graphs', difficulty: 'Hard',   dayNumber: 44, isFrequentlyAsked: true  },
    ],
  },
  {
    name: 'Dynamic Programming',
    slug: 'dynamic-programming',
    description: 'Break into subproblems, memoize results — 1D, 2D, knapsack patterns',
    problems: [
      { id: 'lc-70',   title: 'Climbing Stairs',                    leetcodeNumber: 70,   leetcodeUrl: 'https://leetcode.com/problems/climbing-stairs/',                    pattern: 'Dynamic Programming', difficulty: 'Easy',   dayNumber: 45 },
      { id: 'lc-198',  title: 'House Robber',                       leetcodeNumber: 198,  leetcodeUrl: 'https://leetcode.com/problems/house-robber/',                       pattern: 'Dynamic Programming', difficulty: 'Medium', dayNumber: 45 },
      { id: 'lc-213',  title: 'House Robber II',                    leetcodeNumber: 213,  leetcodeUrl: 'https://leetcode.com/problems/house-robber-ii/',                    pattern: 'Dynamic Programming', difficulty: 'Medium', dayNumber: 45 },
      { id: 'lc-91',   title: 'Decode Ways',                        leetcodeNumber: 91,   leetcodeUrl: 'https://leetcode.com/problems/decode-ways/',                        pattern: 'Dynamic Programming', difficulty: 'Medium', dayNumber: 45 },
      { id: 'lc-62',   title: 'Unique Paths',                       leetcodeNumber: 62,   leetcodeUrl: 'https://leetcode.com/problems/unique-paths/',                       pattern: 'Dynamic Programming', difficulty: 'Medium', dayNumber: 46 },
      { id: 'lc-1143', title: 'Longest Common Subsequence',         leetcodeNumber: 1143, leetcodeUrl: 'https://leetcode.com/problems/longest-common-subsequence/',         pattern: 'Dynamic Programming', difficulty: 'Medium', dayNumber: 46, isFrequentlyAsked: true  },
      { id: 'lc-72',   title: 'Edit Distance',                      leetcodeNumber: 72,   leetcodeUrl: 'https://leetcode.com/problems/edit-distance/',                      pattern: 'Dynamic Programming', difficulty: 'Medium', dayNumber: 46, isFrequentlyAsked: true  },
      { id: 'lc-322',  title: 'Coin Change',                        leetcodeNumber: 322,  leetcodeUrl: 'https://leetcode.com/problems/coin-change/',                        pattern: 'Dynamic Programming', difficulty: 'Medium', dayNumber: 47, isFrequentlyAsked: true  },
      { id: 'lc-518',  title: 'Coin Change II',                     leetcodeNumber: 518,  leetcodeUrl: 'https://leetcode.com/problems/coin-change-ii/',                     pattern: 'Dynamic Programming', difficulty: 'Medium', dayNumber: 47 },
      { id: 'lc-416',  title: 'Partition Equal Subset Sum',         leetcodeNumber: 416,  leetcodeUrl: 'https://leetcode.com/problems/partition-equal-subset-sum/',         pattern: 'Dynamic Programming', difficulty: 'Medium', dayNumber: 47 },
      { id: 'lc-139',  title: 'Word Break',                         leetcodeNumber: 139,  leetcodeUrl: 'https://leetcode.com/problems/word-break/',                         pattern: 'Dynamic Programming', difficulty: 'Medium', dayNumber: 48, isFrequentlyAsked: true  },
      { id: 'lc-55',   title: 'Jump Game',                          leetcodeNumber: 55,   leetcodeUrl: 'https://leetcode.com/problems/jump-game/',                          pattern: 'Dynamic Programming', difficulty: 'Medium', dayNumber: 29 },
      { id: 'lc-300',  title: 'Longest Increasing Subsequence',     leetcodeNumber: 300,  leetcodeUrl: 'https://leetcode.com/problems/longest-increasing-subsequence/',     pattern: 'Dynamic Programming', difficulty: 'Medium', dayNumber: 48 },
    ],
  },
  {
    name: 'Greedy & Intervals',
    slug: 'greedy-intervals',
    description: 'Make locally optimal choice; interval scheduling and merging',
    problems: [
      { id: 'lc-134', title: 'Gas Station',               leetcodeNumber: 134, leetcodeUrl: 'https://leetcode.com/problems/gas-station/',               pattern: 'Greedy & Intervals', difficulty: 'Medium', dayNumber: 49 },
      { id: 'lc-45',  title: 'Jump Game II',              leetcodeNumber: 45,  leetcodeUrl: 'https://leetcode.com/problems/jump-game-ii/',              pattern: 'Greedy & Intervals', difficulty: 'Medium', dayNumber: 29 },
      { id: 'lc-763', title: 'Partition Labels',          leetcodeNumber: 763, leetcodeUrl: 'https://leetcode.com/problems/partition-labels/',          pattern: 'Greedy & Intervals', difficulty: 'Medium', dayNumber: 49 },
      { id: 'lc-56',  title: 'Merge Intervals',           leetcodeNumber: 56,  leetcodeUrl: 'https://leetcode.com/problems/merge-intervals/',           pattern: 'Greedy & Intervals', difficulty: 'Medium', dayNumber: 50 },
      { id: 'lc-57',  title: 'Insert Interval',           leetcodeNumber: 57,  leetcodeUrl: 'https://leetcode.com/problems/insert-interval/',           pattern: 'Greedy & Intervals', difficulty: 'Medium', dayNumber: 50 },
      { id: 'lc-435', title: 'Non-overlapping Intervals', leetcodeNumber: 435, leetcodeUrl: 'https://leetcode.com/problems/non-overlapping-intervals/', pattern: 'Greedy & Intervals', difficulty: 'Medium', dayNumber: 50 },
    ],
  },
];

// Total: 11+7+5+7+7+8+11+3+6+8+9+13+6 = 101... let me recount
// Arrays(11) + TwoPointers(7) + SlidingWindow(5) + Stack(7) + BinarySearch(7) + LinkedList(8) + Trees(11) + Trie(3) + Heap(6) + Backtracking(8) + Graphs(9) + DP(13) + Greedy(6) = 101

export const ALL_PROBLEMS: DSAProblem[] = DSA_PATTERNS.flatMap(p => p.problems);
export const TOTAL_PROBLEMS = ALL_PROBLEMS.length;
export const FREQUENTLY_ASKED_IDS = new Set(ALL_PROBLEMS.filter(p => p.isFrequentlyAsked).map(p => p.id));
