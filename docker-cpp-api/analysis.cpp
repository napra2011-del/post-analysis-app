#include "httplib.h"
#include "nlohmann/json.hpp"

using json = nlohmann::json;

int main() {
    httplib::Server svr;

    svr.Post("/analyze", [](const httplib::Request& req, httplib::Response& res) {
        std::string text = req.body;
        std::istringstream iss(text);
        std::string word;
        std::map<std::string, int> freq;

        while (iss >> word) {
            freq[word]++;
        }

        // Extract top 5 keywords
        std::vector<std::pair<std::string, int>> sorted(freq.begin(), freq.end());
        std::sort(sorted.begin(), sorted.end(), [](auto& a, auto& b) {
            return b.second < a.second;
        });

        std::vector<std::string> top_keywords;
        for (int i = 0; i < std::min(5, (int)sorted.size()); ++i) {
            top_keywords.push_back(sorted[i].first);
        }

        json response = {
            {"wordCount", (int)freq.size()},
            {"keywords", top_keywords}
        };

        res.set_content(response.dump(), "application/json");
    });

    std::cout << "Server running on port 8000..." << std::endl;
    svr.listen("0.0.0.0", 8080);
}
