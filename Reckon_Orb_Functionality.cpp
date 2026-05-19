#include <SFML/Graphics.hpp>
#include <cmath>
#include <optional>
#include <vector>

struct Orb
{
    float radius;
    float angle;
    float speed;
    sf::Color color;
    sf::CircleShape shape;
};

int main()
{
    sf::RenderWindow window(sf::VideoMode({ 1000, 800 }), "Reckon Orb - Trial");
    window.setFramerateLimit(60);

    sf::Vector2f center(500.f, 400.f);
    float orbitRadius = 220.f;

    // Nucleus: Problem / Product
    sf::CircleShape nucleus(45.f);
    nucleus.setOrigin({ 45.f, 45.f });
    nucleus.setPosition(center);
    nucleus.setFillColor(sf::Color(235, 226, 196));

    // Orbit ring
    sf::CircleShape ring(orbitRadius);
    ring.setOrigin({ orbitRadius, orbitRadius });
    ring.setPosition(center);
    ring.setFillColor(sf::Color::Transparent);
    ring.setOutlineThickness(2.f);
    ring.setOutlineColor(sf::Color(120, 140, 170));

    // Orbs
    std::vector<Orb> orbs;

    Orb a;
    a.radius = orbitRadius;
    a.angle = 0.0f;
    a.speed = 1.0f;
    a.color = sf::Color(95, 168, 255);
    a.shape = sf::CircleShape(14.f);
    a.shape.setOrigin({ 14.f, 14.f });
    a.shape.setFillColor(a.color);
    orbs.push_back(a);

    Orb b;
    b.radius = orbitRadius;
    b.angle = 2.1f;
    b.speed = 0.7f;
    b.color = sf::Color(255, 197, 79);
    b.shape = sf::CircleShape(14.f);
    b.shape.setOrigin({ 14.f, 14.f });
    b.shape.setFillColor(b.color);
    orbs.push_back(b);

    Orb c;
    c.radius = orbitRadius;
    c.angle = 4.2f;
    c.speed = 1.25f;
    c.color = sf::Color(167, 139, 250);
    c.shape = sf::CircleShape(14.f);
    c.shape.setOrigin({ 14.f, 14.f });
    c.shape.setFillColor(c.color);
    orbs.push_back(c);

    sf::Clock clock;

    while (window.isOpen())
    {
        while (const std::optional event = window.pollEvent())
        {
            if (event->is<sf::Event::Closed>())
                window.close();
        }

        float dt = clock.restart().asSeconds();

        for (auto& orb : orbs)
        {
            orb.angle += orb.speed * dt;

            float x = center.x + orb.radius * std::cos(orb.angle);
            float y = center.y + orb.radius * std::sin(orb.angle);

            orb.shape.setPosition({ x, y });
        }

        window.clear(sf::Color(10, 18, 30));

        window.draw(ring);
        window.draw(nucleus);

        for (const auto& orb : orbs)
            window.draw(orb.shape);

        window.display();
    }

    return 0;
}
