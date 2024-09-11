import * as React from "react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const types = [
  { title: "Concert", description: "Find concert events." },
  { title: "Conference", description: "Find conference events." },
  { title: "Festival", description: "Find festival events." },
]

const ageGroups = [
  { title: "18-25", description: "Events for ages 18 to 25." },
  { title: "26-40", description: "Events for ages 26 to 40." },
  { title: "40+", description: "Events for ages 40 and above." },
]

const countries = [
  { title: "USA", description: "Events happening in the USA." },
  { title: "Canada", description: "Events happening in Canada." },
  { title: "UK", description: "Events happening in the UK." },
]

export default function FilterNav({ onFilterChange }) {
  const handleFilterChange = (category, value) => {
    onFilterChange(category, value)
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Filter by Type */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Type</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[400px]">
              {types.map((type) => (
                <ListItem
                  key={type.title}
                  title={type.title}
                  onClick={() => handleFilterChange("type", type.title)}
                >
                  {type.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Filter by Age */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Age</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[400px]">
              {ageGroups.map((age) => (
                <ListItem
                  key={age.title}
                  title={age.title}
                  onClick={() => handleFilterChange("age", age.title)}
                >
                  {age.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Filter by Country */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Country</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[400px]">
              {countries.map((country) => (
                <ListItem
                  key={country.title}
                  title={country.title}
                  onClick={() => handleFilterChange("country", country.title)}
                >
                  {country.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

// Correct implementation of React.forwardRef
const ListItem = React.forwardRef(function ListItem(
  { className, title, children, onClick, ...props },
  ref
) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          onClick={onClick}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})

// Setting displayName for better debugging
ListItem.displayName = "ListItem"