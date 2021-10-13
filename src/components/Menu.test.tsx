import { render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Menu } from './Menu';

describe('menu', () => {
  it(`
      should show page title and not show menu content when the menu is closed,
      should show menu title and menu content when the menu is open`, async () => {
    const pageTitle = 'page title';
    const menuTitle = 'menu title';
    const content = 'Something to say on the menu';
    const { queryByTestId, getByTestId } = render(
      <Menu pageTitle={pageTitle} menuTitle={menuTitle}>
        {content}
      </Menu>
    );
    const menuTitleElem = getByTestId('menu-title');
    const menuToggleElem = getByTestId('menu-toggle');

    expect(menuToggleElem).toBeInTheDocument();
    expect(menuTitleElem).toHaveTextContent(pageTitle);
    expect(menuTitleElem).not.toHaveTextContent(menuTitle);
    expect(queryByTestId('menu-content')).not.toBeInTheDocument();

    await act(async () => {
      userEvent.click(menuToggleElem);
    });

    expect(menuTitleElem).toHaveTextContent(menuTitle);
    expect(menuTitleElem).not.toHaveTextContent(pageTitle);
    expect(getByTestId('menu-content')).toBeInTheDocument();
    expect(getByTestId('menu-content')).toHaveTextContent(content);
  });
});
